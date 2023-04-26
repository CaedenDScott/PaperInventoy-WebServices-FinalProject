import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { LocationsModule } from './locations/locations.module';
import { PapersModule } from './papers/papers.module';
import { RoomsModule } from './rooms/rooms.module';
import { StorageTypesModule } from './storage_types/storage_types.module';
import { TransactionTypesModule } from './transaction_types/transaction_types.module';
import { TransactionsModule } from './transactions/transactions.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [MikroOrmModule.forRoot(), EmployeesModule, LocationsModule, PapersModule, RoomsModule, StorageTypesModule, TransactionTypesModule, TransactionsModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
