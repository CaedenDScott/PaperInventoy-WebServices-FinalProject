import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { EntityManager } from '@mikro-orm/mysql';
import { Room } from './entities/room.entity';
import { Loaded } from '@mikro-orm/core';

@Injectable()
export class RoomsService {
  constructor(
    private readonly em: EntityManager
  ) { }

  async create(createRoomDto: CreateRoomDto): Promise<Loaded<Room>> {
    const room = new Room(createRoomDto)

    await this.em.persistAndFlush(room)

    return room
  }

  findAll(): Promise<Loaded<Room[]>> {
    return this.em.find(Room, {})
  }

  async findOne(id: string): Promise<Loaded<Room>> {
    const room = await this.em.findOne(Room, {id});

    if(!room) {
      throw new NotFoundException()
    }

    return room
  }

  async update(id: string, updateRoomDto: UpdateRoomDto): Promise<Loaded<Room>> {
    const room = await this.em.findOne(Room, {id});

    if(!room) {
      throw new NotFoundException()
    }

    if (room) {
      if (updateRoomDto.room_name) {
        room.room_name = updateRoomDto.room_name
      }

      await this.em.persistAndFlush(room)
    }

    return room;
  }

  async remove(id: string): Promise<void> {
    const room = await this.em.findOne(Room, {id});

    if(!room) {
      throw new NotFoundException()
    } else {
      await this.em.removeAndFlush(room)
    }
  }
}
