import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import GuardService from 'src/Guards/auth.service';

@Module({
  controllers: [LocationsController],
  providers: [LocationsService, GuardService]
})
export class LocationsModule {}
