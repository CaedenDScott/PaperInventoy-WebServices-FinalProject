import { Entity, PrimaryKey, Property, ManyToOne } from "@mikro-orm/core"
import { CreateTransactionDto } from "../dto/create-transaction.dto"
import { Employee } from "src/employees/entities/employee.entity"
import {v4 as uuid} from "uuid"
import { TransactionType } from "src/transaction_types/entities/transaction_type.entity"
import { Paper } from "src/papers/entities/paper.entity"

@Entity()
export class Transaction {
    constructor(createTransactionDto: CreateTransactionDto) {
        this.supplier = createTransactionDto.supplier
        this.time_stamp = createTransactionDto.time_stamp
        this.quantity = createTransactionDto.quantity
    }
    @PrimaryKey()
    id: string = uuid()

    @Property({
        length: 20
    })
    time_stamp: string

    @Property({ 
        length: 40
    })
    supplier: string

    @Property()
    quantity: number

    @ManyToOne({
        entity: () => Employee,
        inversedBy: employee => employee.transaction,
        onDelete: "cascade"
    })
    employee: Employee

    @ManyToOne({
        entity: () => TransactionType,
        inversedBy: transactionType => transactionType.transaction,
        onDelete: "cascade"
    })
    transactionType: TransactionType

    @ManyToOne({
        entity: () => Paper,
        inversedBy: paper => paper.transaction,
        onDelete: "cascade"
    })
    paper: Paper
}