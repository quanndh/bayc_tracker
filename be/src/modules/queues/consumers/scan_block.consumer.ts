import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Alchemy, NftSaleMarketplace } from 'alchemy-sdk';
import { Job } from 'bull';
import { ethers } from 'ethers';
import * as moment from 'moment';
import { NftService } from 'src/modules/blockchain/services/nft.service';
import { CacheService } from 'src/modules/cache/services/cache.service';
import { CacheKey } from 'src/modules/cache/utils/cache_key';
import { TransactionService } from 'src/modules/transactions/services/transaction.service';
import * as chunk from 'chunk';
import { QueueProducer } from 'src/modules/queues/producers/queue.producer';

export interface ScanBlockPayload {
  blockNumber: number;
  toBlock: number;
}

@Processor('scan_block')
export class ScanBlockConsumer {
  private readonly logger = new Logger(ScanBlockConsumer.name);
  private address = '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D';
  private jobAdded = [];

  constructor(
    private readonly configService: ConfigService,
    private readonly nftService: NftService,
    private readonly transactionService: TransactionService,
    private readonly cacheService: CacheService,
    private readonly queueProducer: QueueProducer,
  ) {}

  @Process({ name: 'firstScan' })
  async processFirstScan(job: Job<ScanBlockPayload>) {
    try {
      const {
        data: { blockNumber },
      } = job;
      let startBlock = 14965781;
      while (startBlock < blockNumber) {
        const nextToBlock =
          startBlock + 1000000 > blockNumber
            ? blockNumber
            : startBlock + 1000000;
        await this.queueProducer.scanBlock(startBlock, nextToBlock, false);
        startBlock = nextToBlock + 1;
      }
    } catch (error) {
      this.logger.error(error);
      await job.retry();
    }
  }

  @Process({ name: 'normalScan', concurrency: 5 })
  async processBlock(job: Job<ScanBlockPayload>) {
    try {
      const {
        data: { blockNumber, toBlock },
      } = job;

      if (this.jobAdded.includes(blockNumber)) return;

      const alchemy = new Alchemy(this.configService.get('alchemy'));

      const nftSales = await this.getSales(blockNumber, toBlock, alchemy);

      this.jobAdded.push(blockNumber);

      this.logger.debug(
        `Scan from block: ${blockNumber}, to block: ${toBlock}`,
      );

      if (nftSales.length) {
        const chunkedNftSales = chunk(nftSales, 100);
        this.logger.debug(`Transaciton count: ${nftSales.length} `);

        for await (const chunk of chunkedNftSales) {
          await this.processNftSales(chunk, alchemy);
        }
      }
    } catch (error) {
      this.logger.error(error);
      await job.retry();
    }
  }

  getSales = async (blockNumber, toBlock, alchemy) => {
    const { nftSales, pageKey } = await alchemy.nft.getNftSales({
      fromBlock: blockNumber,
      toBlock: toBlock,
      marketplace: NftSaleMarketplace.SEAPORT,
      contractAddress: this.address,
    });
    let nextPage = pageKey;
    const data = nftSales;

    while (nextPage) {
      const { nftSales: nftSalesData, pageKey: newPageKey } =
        await alchemy.nft.getNftSales({
          fromBlock: blockNumber,
          toBlock: toBlock,
          marketplace: NftSaleMarketplace.SEAPORT,
          contractAddress: this.address,
          pageKey: nextPage,
        });
      data.concat(nftSalesData);
      nextPage = newPageKey;
    }

    return data;
  };

  processNftSales = async (nftSales, alchemy) => {
    try {
      for (let i = 0; i < nftSales.length; i++) {
        try {
          const nftSale = nftSales[i];
          const {
            tokenId,
            transactionHash,
            sellerAddress,
            buyerAddress,
            quantity,
            sellerFee,
            royaltyFee,
            blockNumber,
          } = nftSale;

          const nft = await this.nftService.findOne({ where: { tokenId } });
          if (!nft) {
            const nftMetadata = await alchemy.nft.getNftMetadata(
              this.address,
              tokenId,
            );

            await this.nftService.create({
              tokenId,
              image: nftMetadata.media[0].gateway,
            });
          }

          const { timestamp } = await alchemy.core.getBlock(blockNumber);

          const transaction = await this.transactionService.findOne({
            where: {
              txHash: transactionHash,
            },
          });

          if (!transaction) {
            const formartedSellerFee = ethers.utils.formatEther(
              sellerFee.amount,
            );
            const formartedRoyaltyFee = ethers.utils.formatEther(
              royaltyFee.amount,
            );

            const priceInEth =
              Number(formartedSellerFee) + Number(formartedRoyaltyFee);

            const ethPrice = await this.cacheService.get<number>(
              CacheKey.ethPrice,
            );

            await this.transactionService.create({
              tokenId,
              quantity: Number(quantity),
              buyer: buyerAddress,
              seller: sellerAddress,
              priceInEth,
              price: priceInEth * ethPrice,
              txHash: transactionHash,
              createdAt: moment(timestamp * 1000).toDate(),
            });
          }
        } catch (error) {
          continue;
        }
      }
    } catch (error) {
      throw error;
    }
  };
}
