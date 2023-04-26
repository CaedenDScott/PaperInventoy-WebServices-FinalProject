import { Entity, ManyToOne, OneToMany, PrimaryKey, Property, Collection } from "@mikro-orm/core"
import { CreateLocationDto } from "../dto/create-location.dto"
import { Room } from "src/rooms/entities/room.entity"
import { Paper } from "src/papers/entities/paper.entity"
import {v4 as uuid} from "uuid"

@Entity()
export class Location {
    constructor(createLocationDto: CreateLocationDto) {
        this.location_name = createLocationDto.location_name
    }

    @PrimaryKey()
    id: string = uuid()

    @Property({
        length: 20
    })
    location_name: string

    @ManyToOne({
        entity: () => Room,
        inversedBy: room => room.location,
        onDelete: "cascade"
    })
    room: Room

    @OneToMany(() => Paper, (paper) => paper.location)
    paper = new Collection<Paper>(this)

}
