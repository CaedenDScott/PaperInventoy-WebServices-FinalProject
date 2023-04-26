import { Entity, PrimaryKey, Property, OneToMany, Collection } from "@mikro-orm/core"
import { CreateTransactionTypeDto } from "../dto/create-transaction_type.dto"
import { Transaction } from "src/transactions/entities/transaction.entity"
import {v4 as uuid} from "uuid"

@Entity()
export class TransactionType {
    constructor(createTransactionTypeDto: CreateTransactionTypeDto) {
        this.type_name = createTransactionTypeDto.type_name
        this.quantity_on_hand_multiplier = createTransactionTypeDto.quantity_on_hand_multiplier
        this.quantity_ordered = createTransactionTypeDto.quantity_ordered
    }
    @PrimaryKey()
    id: string = uuid()

    @Property({
        length: 15
    })
    type_name!: string

    @Property()
    quantity_on_hand_multiplier!: number

    @Property()
    quantity_ordered!: number

    @OneToMany(() => Transaction, (transaction) => transaction.transactionType)
    transaction = new Collection<Transaction>(this)
}
