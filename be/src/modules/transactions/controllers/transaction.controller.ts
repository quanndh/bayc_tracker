import { Controller, Get, Query } from '@nestjs/common';
import { TransactionService } from 'src/modules/transactions/services/transaction.service';

@Controller('/txs')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  txs(@Query('page') page: number) {
    return this.transactionService.paginate(page);
  }

  @Get('/chart')
  txChart() {
    return this.transactionService.getChartData();
  }
}
