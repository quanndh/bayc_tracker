import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';
import { delay } from 'rxjs';
import { ScannedBlockService } from 'src/modules/blockchain/services/scanned_block.service';
import { QueueProducer } from 'src/modules/queues/producers/queue.producer';

@Injectable()
export class BlockService implements OnModuleInit {
  private logger = new Logger(BlockService.name);
  constructor(
    private readonly configService: ConfigService,
    private readonly scannedBlockService: ScannedBlockService,
    private readonly queueProducer: QueueProducer,
  ) {}

  async onModuleInit() {
    await this.scan();
  }

  scan = async () => {
    try {
      const provider = new ethers.providers.StaticJsonRpcProvider(
        this.configService.get('rpc'),
      );
      const blockConfirm = this.configService.get('blockConfirm');

      const lastBlock = await provider.getBlockNumber();

      let scannedBlock = await this.scannedBlockService.findOne({ where: {} });
      if (!scannedBlock) {
        scannedBlock = await this.scannedBlockService.create({
          lastScannedBlock: lastBlock - blockConfirm - 1,
        });
        await this.queueProducer.scanBlock(
          lastBlock - blockConfirm - 1,
          lastBlock - blockConfirm - 1,
          true,
        );
      }

      const { lastScannedBlock } = scannedBlock;

      if (lastScannedBlock < lastBlock) {
        for (let i = lastScannedBlock + 1; i <= lastBlock - blockConfirm; i++) {
          const isAdded = await this.queueProducer.scanBlock(i, i, false);
          if (isAdded) {
            await this.scannedBlockService.update(scannedBlock.id, {
              lastScannedBlock: i,
            });
          }
        }
      }
    } catch (error) {
      this.logger.error(error);
    } finally {
      delay(20000);
      this.scan().catch(this.logger.error);
    }
  };
}
