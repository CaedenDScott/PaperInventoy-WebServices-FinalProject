import { Entity, PrimaryKey, Property, ManyToOne, OneToMany, Collection } from "@mikro-orm/core"
import { CreatePaperDto } from "../dto/create-paper.dto"
import { Location } from "src/locations/entities/location.entity"
import { Transaction } from "src/transactions/entities/transaction.entity"
import {v4 as uuid} from "uuid"
import { StorageType } from "src/storage_types/entities/storage_type.entity"


@Entity()
export class Paper {
    constructor(createPaperDto: CreatePaperDto) {
        this.supplier = createPaperDto.supplier
        this.size = createPaperDto.size
        this.weight = createPaperDto.weight
        this.finish = createPaperDto.finish
        this.type = createPaperDto.type
        this.quantity_on_hand = createPaperDto.quantity_on_hand
        this.quantity_ordered = createPaperDto.quantity_ordered
    }

    @PrimaryKey()
    id: string = uuid()

    @Property({
        length: 40
    })
    supplier!: string

    @Property({
        length: 5
    })
    size!: string

    @Property()
    weight!: number

    @Property({
        length: 30
    })
    finish!: string

    @Property({
        length: 5
    })
    type!: string

    @Property()
    quantity_on_hand!: number

    @Property()
    quantity_ordered!: number

    @ManyToOne({
        entity: () => Location,
        inversedBy: location => location.paper,
        onDelete: "cascade"
    })
    location: Location

    @OneToMany(() => Transaction, (transaction) => transaction.paper)
    transaction = new Collection<Transaction>(this)

    @ManyToOne({
        entity: () => StorageType,
        inversedBy: storageType => storageType.paper,
        onDelete: "cascade"
    })
    storageType: StorageType

}
