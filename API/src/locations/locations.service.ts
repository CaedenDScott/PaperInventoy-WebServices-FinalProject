import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Location } from './entities/location.entity';
import { EntityManager, Loaded } from '@mikro-orm/core';
import { Room } from 'src/rooms/entities/room.entity';
import { CreateRoomDto } from 'src/rooms/dto/create-room.dto';

@Injectable()
export class LocationsService {
  constructor(
    private readonly em: EntityManager
  ) { }
  
  async create(createLocationDto: CreateLocationDto): Promise<Loaded<Location>> {
    const location = new Location(createLocationDto)
    const room = await this.em.findOne(Room, createLocationDto.room_id)

    if(!room) {
      throw new NotFoundException()
    }

    location.room = room

    await this.em.persistAndFlush(location)

    return location
  }

  findAll(): Promise<Loaded<Location[]>> {
    return this.em.find(Location, {})
  }

  async findOne(id: string): Promise<Loaded<Location>> {
    const location = await this.em.findOne(Location, {id});

    if(!location) {
      throw new NotFoundException()
    }

    return location
  }

  async update(id: string, updateLocationDto: UpdateLocationDto): Promise<Loaded<Location>> {
    const location = await this.em.findOne(Location, {id});

    if(!location) {
      throw new NotFoundException()
    }

    if (location) {
      if (updateLocationDto.location_name) {
        location.location_name = updateLocationDto.location_name
      }
      if (updateLocationDto.room_id) {
        const room = await this.em.findOne(Room, {id: updateLocationDto.room_id})

        if(!room) {
          throw new NotFoundException()
        }

        location.room = room
      }

      await this.em.persistAndFlush(location)
    }

    return location;
  }

  async remove(id: string): Promise<void> {
    const location = await this.em.findOne(Location, {id});

    if(!location) {
      throw new NotFoundException()
    } else {
      await this.em.removeAndFlush(location)
    }
  }
}
