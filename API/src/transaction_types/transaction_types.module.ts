import { Module } from '@nestjs/common';
import { TransactionTypesService } from './transaction_types.service';
import { TransactionTypesController } from './transaction_types.controller';
import GuardService from 'src/Guards/auth.service';

@Module({
  controllers: [TransactionTypesController],
  providers: [TransactionTypesService, GuardService]
})
export class TransactionTypesModule {}
