import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import GuardService from 'src/Guards/auth.service';

@Module({
  controllers: [EmployeesController],
  providers: [EmployeesService, GuardService]
})
export class EmployeesModule {}
