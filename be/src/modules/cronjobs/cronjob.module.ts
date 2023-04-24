import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { BlockchainModule } from 'src/modules/blockchain/blockchain.module';
import { EthPriceService } from 'src/modules/cronjobs/services/eth_price.service';

@Module({
  imports: [ScheduleModule.forRoot(), BlockchainModule],
  providers: [EthPriceService],
})
export class CronJobModule {}
