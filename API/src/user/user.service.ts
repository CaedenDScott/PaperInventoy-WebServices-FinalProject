import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { User } from './entities/user.entity';
import { EntityManager } from '@mikro-orm/mysql';
import { Loaded } from '@mikro-orm/core';
import * as crypto from "crypto"
import { AuthGuard } from 'src/Guards/auth.guard';

@Injectable()
export class UserService {
  constructor(
    private readonly em: EntityManager
  ) { }
  
  async create(): Promise<Loaded<User>> {
    const user = new User()
    await this.em.persistAndFlush(user)
    return user
  }

  @UseGuards(AuthGuard)
  findAll(): Promise<Loaded<User[]>> {
    return this.em.find(User, {})
  }

  @UseGuards(AuthGuard)
  async findOne(apiKey: string) {
    const user = await this.em.findOne(User, {apiKey});

    if(!user) {
      throw new NotFoundException()
    }

    return user
  }

  @UseGuards(AuthGuard)
  async update(apiKey: string): Promise<Loaded<User>> {
    try {
      const user = await this.em.findOneOrFail(User, {apiKey});
      user.apiKey = crypto.randomBytes(32).toString("hex")
      await this.em.persistAndFlush(user)
      return user
    } catch(exception) {
      throw new NotFoundException()
    }
  }

  @UseGuards(AuthGuard)
  async remove(apiKey: string): Promise<void> {
    const user = await this.em.findOne(User, {apiKey});

    if(!user) {
      throw new NotFoundException()
    } else {
      await this.em.removeAndFlush(user)
    }
  }
}
