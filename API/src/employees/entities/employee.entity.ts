import { Collection, Entity, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { CreateEmployeeDto } from "../dto/create-employee.dto";
import { Transaction } from "src/transactions/entities/transaction.entity";
import {v4 as uuid} from "uuid"

@Entity()
export class Employee {
    constructor(createEmployeeDto: CreateEmployeeDto) {
        this.username = createEmployeeDto.username
        this.password = createEmployeeDto.password
    }
    @PrimaryKey()
    id: string = uuid()

    @Property({
        length: 20
    })
    username!: string

    @Property({
        length: 8
    })
    password!: string

    @OneToMany(() => Transaction, (transaction) => transaction.employee)
    transaction = new Collection<Transaction>(this)

}

