import { Module } from '@nestjs/common';
import { StorageTypesService } from './storage_types.service';
import { StorageTypesController } from './storage_types.controller';
import GuardService from 'src/Guards/auth.service';

@Module({
  controllers: [StorageTypesController],
  providers: [StorageTypesService, GuardService]
})
export class StorageTypesModule {}
