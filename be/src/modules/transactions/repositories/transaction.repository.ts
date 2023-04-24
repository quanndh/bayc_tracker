import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonRepository } from 'src/modules/common/repositories/common.repository';
import { Transaction } from 'src/modules/transactions/entities/transaction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionRepository extends CommonRepository<Transaction> {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepo: Repository<Transaction>,
  ) {
    super(transactionRepo);
  }
}
