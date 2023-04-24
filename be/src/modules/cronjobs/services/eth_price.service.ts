import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EthService } from 'src/modules/blockchain/services/eth.service';

@Injectable()
export class EthPriceService {
  private readonly logger = new Logger(EthPriceService.name);

  constructor(private readonly ethService: EthService) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron() {
    try {
      await this.ethService.setPrice();
      this.logger.debug('ETH price updated');
    } catch (error) {
      this.logger.error(error);
    }
  }
}
