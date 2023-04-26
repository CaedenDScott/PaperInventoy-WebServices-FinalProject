import { Injectable, NotFoundException, createParamDecorator } from '@nestjs/common';
import { CreatePaperDto } from './dto/create-paper.dto';
import { UpdatePaperDto } from './dto/update-paper.dto';
import { EntityManager, Loaded } from '@mikro-orm/core';
import { Paper } from './entities/paper.entity';
import { Location } from '../locations/entities/location.entity'
import { StorageType } from 'src/storage_types/entities/storage_type.entity';

@Injectable()
export class PapersService {
  constructor(
    private readonly em: EntityManager
  ) {}

  async create(createPaperDto: CreatePaperDto): Promise<Loaded<Paper>> {
    const paper = new Paper(createPaperDto)
    const location = await this.em.findOne(Location, createPaperDto.location_id)
    const storageType = await this.em.findOne(StorageType, createPaperDto.storage_type_id)

    if(!location || !storageType) {
      throw new NotFoundException()
    }

    paper.location = location
    paper.storageType = storageType
    
    await this.em.persistAndFlush(paper)

    return paper
  }

  findAll(): Promise<Loaded<Paper[]>> {
    return this.em.find(Paper, {})
  }

  async findOne(id: string): Promise<Loaded<Paper>> {
    const paper = await this.em.findOne(Paper, {id});

    if(!paper) {
      throw new NotFoundException()
    }

    return paper
  }

  async update(id: string, updatePaperDto: UpdatePaperDto): Promise<Loaded<Paper>> {
    const paper = await this.em.findOne(Paper, {id});

    if(!paper) {
      throw new NotFoundException()
    }

    if (paper != null) {
      if (updatePaperDto.supplier) {
        paper.supplier = updatePaperDto.supplier
      }
      if (updatePaperDto.size) {
        paper.size = updatePaperDto.size
      }
      if (updatePaperDto.weight) {
        paper.weight = updatePaperDto.weight
      }
      if (updatePaperDto.finish) {
        paper.finish = updatePaperDto.finish
      }
      if (updatePaperDto.type) {
        paper.type = updatePaperDto.type
      }
      if (updatePaperDto.quantity_on_hand) {
        paper.quantity_on_hand = updatePaperDto.quantity_on_hand
      }
      if (updatePaperDto.quantity_ordered) {
        paper.quantity_ordered = updatePaperDto.quantity_ordered
      }
      if (updatePaperDto.location_id) {
        const location = await this.em.findOne(Location, {id: updatePaperDto.location_id})

        if(!location) {
          throw new NotFoundException()
        }

        paper.location = location
      }
      if (updatePaperDto.storage_type_id) {
        const storageType = await this.em.findOne(StorageType, {id: updatePaperDto.storage_type_id})

        if(!storageType) {
          throw new NotFoundException()
        }

        paper.storageType = storageType
      }
      await this.em.persistAndFlush(paper)
    }

    return paper;
  }

  async remove(id: string): Promise<void> {
    const paper = await this.em.findOne(Paper, {id});

    if(!paper) {
      throw new NotFoundException()
    } else {
      await this.em.removeAndFlush(paper)
    }
  }
}
