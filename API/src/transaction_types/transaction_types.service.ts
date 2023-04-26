import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionTypeDto } from './dto/create-transaction_type.dto';
import { UpdateTransactionTypeDto } from './dto/update-transaction_type.dto';
import { EntityManager } from '@mikro-orm/mysql';
import { TransactionType } from './entities/transaction_type.entity';
import { Loaded, Transaction } from '@mikro-orm/core';

@Injectable()
export class TransactionTypesService {
  constructor(
    private readonly em: EntityManager
  ) { }
  
  async create(createTransactionTypeDto: CreateTransactionTypeDto): Promise<Loaded<TransactionType>> {
    const transactionType = new TransactionType(createTransactionTypeDto)

    await this.em.persistAndFlush(transactionType)

    return transactionType
  }

  findAll(): Promise<Loaded<TransactionType[]>> {
    return this.em.find(TransactionType, {})
  }

  async findOne(id: string): Promise<Loaded<TransactionType>> {
    const transactionType = await this.em.findOne(TransactionType, {id});

    if(!transactionType) {
      throw new NotFoundException()
    }

    return transactionType
  }

  async update(id: string, updateTransactionTypeDto: UpdateTransactionTypeDto): Promise<Loaded<TransactionType>> {
    const transactionType = await this.em.findOne(TransactionType, {id});

    if(!transactionType) {
      throw new NotFoundException()
    }

    if (transactionType) {
      if (updateTransactionTypeDto.quantity_on_hand_multiplier) {
        transactionType.quantity_on_hand_multiplier = updateTransactionTypeDto.quantity_on_hand_multiplier
      }
      if (updateTransactionTypeDto.quantity_ordered) {
        transactionType.quantity_ordered = updateTransactionTypeDto.quantity_ordered
      }
      if (updateTransactionTypeDto.type_name) {
        transactionType.type_name = updateTransactionTypeDto.type_name
      }
      await this.em.persistAndFlush(transactionType)
    }

    return transactionType;
  }

  async remove(id: string): Promise<void> {
    const transactionType = await this.em.findOne(TransactionType, {id});

    if(!transactionType) {
      throw new NotFoundException()
    } else {
      await this.em.removeAndFlush(transactionType)
    }
  }
}
