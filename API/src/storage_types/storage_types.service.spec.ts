import { Test, TestingModule } from '@nestjs/testing';
import { StorageTypesService } from './storage_types.service';

describe('StorageTypesService', () => {
  let service: StorageTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StorageTypesService],
    }).compile();

    service = module.get<StorageTypesService>(StorageTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
