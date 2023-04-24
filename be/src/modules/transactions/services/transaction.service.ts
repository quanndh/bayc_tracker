import { Injectable } from '@nestjs/common';
import { createPaginationObject } from 'src/helpers/resolve-pagination';
import { Nft } from 'src/modules/blockchain/entities/nft.entity';
import { CommonService } from 'src/modules/common/services/common.service';
import { Transaction } from 'src/modules/transactions/entities/transaction.entity';
import { TransactionRepository } from 'src/modules/transactions/repositories/transaction.repository';

@Injectable()
export class TransactionService extends CommonService<Transaction> {
  constructor(private readonly transactionRepo: TransactionRepository) {
    super(transactionRepo);
  }

  paginate = async (page: number) => {
    const [items, count] = await Promise.all([
      this.transactionRepo
        .createQueryBuilder('txs')
        .orderBy('txs.createdAt', 'DESC')
        .leftJoinAndSelect(Nft, 'nfts', 'nfts.token_id = txs.token_id')
        .limit(20)
        .offset((page - 1) * 20)
        .getRawMany(),
      this.transactionRepo.count(),
    ]);

    const data = items.map((item) => ({
      id: item.txs_id,
      createdAt: item['txs_ created_at'],
      tokenId: item.txs_token_id,
      quantity: item.txs_quantity,
      buyer: item.txs_buyer,
      seller: item.txs_seller,
      priceInEth: item.txs_price_in_eth,
      price: item.txs_price,
      txHash: item.txs_tx_hash,
      nft: {
        image: item.nfts_image,
      },
    }));
    return createPaginationObject(data, count, page, 20);
  };

  getChartData = () => {
    return this.transactionRepo
      .createQueryBuilder('txs')
      .select('SUM(txs.price_in_eth) as volume')
      .addSelect('AVG(price_in_eth)::numeric(10,2) as average')
      .addSelect("DATE_TRUNC('day', txs.createdAt) as day")
      .groupBy("DATE_TRUNC('day', txs.createdAt)")
      .orderBy('day', 'ASC')
      .getRawMany();
  };
}
