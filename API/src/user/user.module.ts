import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import GuardService from 'src/Guards/auth.service';

@Module({
  controllers: [UserController],
  providers: [UserService, GuardService]
})
export class UserModule {}
