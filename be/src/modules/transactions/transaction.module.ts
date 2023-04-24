import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionController } from 'src/modules/transactions/controllers/transaction.controller';
import { Transaction } from 'src/modules/transactions/entities/transaction.entity';
import { TransactionRepository } from 'src/modules/transactions/repositories/transaction.repository';
import { TransactionService } from 'src/modules/transactions/services/transaction.service';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction])],
  providers: [TransactionRepository, TransactionService],
  controllers: [TransactionController],
  exports: [TransactionService],
})
export class TransactionModule {}
