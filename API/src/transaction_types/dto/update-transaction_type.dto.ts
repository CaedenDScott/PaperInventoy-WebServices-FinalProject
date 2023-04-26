import { PartialType } from '@nestjs/mapped-types';
import { CreateTransactionTypeDto } from './create-transaction_type.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTransactionTypeDto extends PartialType(CreateTransactionTypeDto) {
    @ApiProperty({
        type: String,
    })
    type_name: string

    @ApiProperty({
        type: Number,
    })
    quantity_on_hand_multiplier: number

    @ApiProperty({
        type: Number,
    })
    quantity_ordered: number
}
