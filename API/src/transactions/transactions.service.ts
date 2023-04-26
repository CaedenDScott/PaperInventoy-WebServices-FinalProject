import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { EntityManager } from '@mikro-orm/mysql';
import { Transaction } from './entities/transaction.entity';
import { Loaded } from '@mikro-orm/core';
import { Employee } from 'src/employees/entities/employee.entity';
import { TransactionType } from 'src/transaction_types/entities/transaction_type.entity';
import { Paper } from 'src/papers/entities/paper.entity';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly em: EntityManager
  ) { }
  
  async create(createTransactionDto: CreateTransactionDto): Promise<Loaded<Transaction>> {
    const transaction = new Transaction(createTransactionDto)
    const employee = await this.em.findOne(Employee, createTransactionDto.employee_id)
    const transactionType = await this.em.findOne(TransactionType, createTransactionDto.transaction_type_id)
    const paper = await this.em.findOne(Paper, createTransactionDto.paper_id)

    if(!employee || !transactionType || !paper) {
      throw new NotFoundException()
    }

    transaction.employee = employee
    transaction.transactionType = transactionType
    transaction.paper = paper

    await this.em.persistAndFlush(transaction)

    return transaction
  }

  findAll(): Promise<Loaded<Transaction[]>> {
    return this.em.find(Transaction, {})
  }

  async findOne(id: string): Promise<Loaded<Transaction>> {
    const transaction = await this.em.findOne(Transaction, {id});

    if(!transaction) {
      throw new NotFoundException()
    }

    return transaction
  }
  async update(id: string, updateTransactionDto: UpdateTransactionDto): Promise<Loaded<Transaction>> {
    const transaction = await this.em.findOne(Transaction, {id});

    if(!transaction) {
      throw new NotFoundException()
    }

    if (transaction) {
      if (updateTransactionDto.time_stamp) {
        transaction.time_stamp = updateTransactionDto.time_stamp
      }
      if (updateTransactionDto.supplier) {
        transaction.supplier = updateTransactionDto.supplier
      }
      if (updateTransactionDto.quantity) {
        transaction.quantity = updateTransactionDto.quantity
      }
      if (updateTransactionDto.employee_id) {
        const employee = await this.em.findOne(Employee, {id: updateTransactionDto.employee_id})

        if(!employee) {
          throw new NotFoundException()
        }

        transaction.employee = employee
      }
      if (updateTransactionDto.transaction_type_id) {
        const transactionType = await this.em.findOne(TransactionType, {id: updateTransactionDto.transaction_type_id})

        if(!transactionType) {
          throw new NotFoundException()
        }

        transaction.transactionType = transactionType
      }
      if (updateTransactionDto.paper_id) {
        const paper = await this.em.findOne(Paper, {id: updateTransactionDto.paper_id})

        if(!paper) {
          throw new NotFoundException()
        }

        transaction.paper = paper
      }
      
      await this.em.persistAndFlush(transaction)
    }

    return transaction;
  }

  async remove(id: string): Promise<void> {
    const transaction = await this.em.findOne(Transaction, {id});

    if(!transaction) {
      throw new NotFoundException()
    } else {
      await this.em.removeAndFlush(transaction)
    }
  }
}
