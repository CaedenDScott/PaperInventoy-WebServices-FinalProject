import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import GuardService from 'src/Guards/auth.service';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService, GuardService]
})
export class TransactionsModule {}
