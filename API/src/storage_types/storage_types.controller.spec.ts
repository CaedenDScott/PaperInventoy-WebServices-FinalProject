import { Test, TestingModule } from '@nestjs/testing';
import { StorageTypesController } from './storage_types.controller';
import { StorageTypesService } from './storage_types.service';

describe('StorageTypesController', () => {
  let controller: StorageTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StorageTypesController],
      providers: [StorageTypesService],
    }).compile();

    controller = module.get<StorageTypesController>(StorageTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
