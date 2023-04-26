import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStorageTypeDto } from './dto/create-storage_type.dto';
import { UpdateStorageTypeDto } from './dto/update-storage_type.dto';
import { EntityManager } from '@mikro-orm/mysql';
import { StorageType } from './entities/storage_type.entity';
import { Loaded } from '@mikro-orm/core';

@Injectable()
export class StorageTypesService {
  constructor(
    private readonly em: EntityManager
  ) { }

  async create(createStorageTypeDto: CreateStorageTypeDto): Promise<Loaded<StorageType>> {
    const storageType = new StorageType(createStorageTypeDto)

    await this.em.persistAndFlush(storageType)

    return storageType
  }

  findAll(): Promise<Loaded<StorageType[]>> {
    return this.em.find(StorageType, {})
  }

  async findOne(id: string): Promise<Loaded<StorageType>> {
    const storageType = await this.em.findOne(StorageType, {id});

    if(!storageType) {
      throw new NotFoundException()
    }

    return storageType
  }

  async update(id: string, updateStorageTypeDto: UpdateStorageTypeDto): Promise<Loaded<StorageType>> {
    const storageType = await this.em.findOne(StorageType, {id});

    if(!storageType) {
      throw new NotFoundException()
    }

    if (storageType) {
      if (updateStorageTypeDto.bound_in) {
        storageType.bound_in = updateStorageTypeDto.bound_in
      }
      if (updateStorageTypeDto.quantity) {
        storageType.quantity = updateStorageTypeDto.quantity
      }

      await this.em.persistAndFlush(storageType)
    }

    return storageType;
  }

  async remove(id: string): Promise<void> {
    const storageType = await this.em.findOne(StorageType, {id});

    if(!storageType) {
      throw new NotFoundException()
    } else {
      await this.em.removeAndFlush(storageType)
    }
  }
}
