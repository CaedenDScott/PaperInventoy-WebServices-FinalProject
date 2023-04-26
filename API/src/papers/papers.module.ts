import { Module } from '@nestjs/common';
import { PapersService } from './papers.service';
import { PapersController } from './papers.controller';
import GuardService from 'src/Guards/auth.service';

@Module({
  controllers: [PapersController],
  providers: [PapersService, GuardService]
})
export class PapersModule {}
