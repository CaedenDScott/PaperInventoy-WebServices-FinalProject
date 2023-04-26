import { Entity, PrimaryKey, Property, Collection, OneToMany } from "@mikro-orm/core"
import { CreateStorageTypeDto } from "../dto/create-storage_type.dto"
import { Paper } from "src/papers/entities/paper.entity"
import { v4 as uuid } from "uuid"


@Entity()
export class StorageType {
    constructor(createStorageTypeDto: CreateStorageTypeDto) {
        this.bound_in = createStorageTypeDto.bound_in
        this.quantity = createStorageTypeDto.quantity
    }   

    @PrimaryKey()
    id: string = uuid()

    @Property({
        length: 15
    })
    bound_in!: string

    @Property()
    quantity!: number

    @OneToMany(() => Paper, (paper) => paper.storageType)
    paper = new Collection<Paper>(this)
}
