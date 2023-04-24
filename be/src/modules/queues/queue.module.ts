import { Global, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';
import { QueueProducer } from 'src/modules/queues/producers/queue.producer';
import { ScanBlockConsumer } from 'src/modules/queues/consumers/scan_block.consumer';
import { BlockchainModule } from 'src/modules/blockchain/blockchain.module';
import { TransactionModule } from 'src/modules/transactions/transaction.module';

@Global()
@Module({
  imports: [
    BullModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          redis: {
            host: configService.get('redis.host'),
            port: configService.get('redis.port'),
          },
        };
      },
      inject: [ConfigService],
    }),
    BullModule.registerQueue({
      name: 'scan_block',
    }),
    BlockchainModule,
    TransactionModule,
  ],
  providers: [QueueProducer, ScanBlockConsumer],
  exports: [QueueProducer],
})
export class QueueModule {}
