import { Entity, PrimaryKey, OneToMany, Collection, Property } from "@mikro-orm/core"
import { CreateRoomDto } from "../dto/create-room.dto"
import { Location } from "src/locations/entities/location.entity"
import {v4 as uuid} from "uuid"

@Entity()
export class Room {
    constructor(createRoomDto: CreateRoomDto) {
        this.room_name = createRoomDto.room_name
    }
    @PrimaryKey()
    id: string = uuid()

    @Property({
        length: 9
    })
    room_name!: string

    @OneToMany(() => Location, (location) => location.room)
    location = new Collection<Location>(this)
}
