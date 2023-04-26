import { Module } from '@nestjs/common';
import GuardService from './auth.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [MikroOrmModule.forRoot()],
  providers: [GuardService],
})
export class AppModule {}

