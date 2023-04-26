import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import GuardService from 'src/Guards/auth.service';

@Module({
  controllers: [RoomsController],
  providers: [RoomsService, GuardService]
})
export class RoomsModule {}
