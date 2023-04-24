import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class QueueProducer {
  private readonly logger = new Logger(QueueProducer.name);
  constructor(@InjectQueue('scan_block') private scanBlockQueue: Queue) {}

  scanBlock = async (
    blockNumber: number,
    toBlock: number,
    firstScan: boolean,
  ) => {
    try {
      if (firstScan) {
        await this.scanBlockQueue.add('firstScan', {
          blockNumber,
          toBlock,
        });
      } else {
        await this.scanBlockQueue.add('normalScan', {
          blockNumber,
          toBlock,
        });
      }

      return true;
    } catch (error) {
      this.logger.error(error);
    }
  };
}
