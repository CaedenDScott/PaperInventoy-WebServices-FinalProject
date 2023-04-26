import { ApiProperty } from "@nestjs/swagger"

export class CreateTransactionTypeDto {
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
