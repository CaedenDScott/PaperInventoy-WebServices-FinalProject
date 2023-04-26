import { PartialType } from '@nestjs/mapped-types';
import { CreateTransactionDto } from './create-transaction.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {
    @ApiProperty({
        type: String,
    })
    time_stamp: string

    @ApiProperty({
        type: String,
    })
    supplier: string

    @ApiProperty({
        type: Number,
    })
    quantity: number

    @ApiProperty({
        type: String,
    })
    employee_id: string

    @ApiProperty({
        type: String,
    })
    transaction_type_id: string

    @ApiProperty({
        type: String,
    })
    paper_id: string
}
