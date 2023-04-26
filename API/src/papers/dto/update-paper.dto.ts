import { PartialType } from '@nestjs/mapped-types';
import { CreatePaperDto } from './create-paper.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePaperDto extends PartialType(CreatePaperDto) {
    @ApiProperty({
        type: String,
    })
    supplier: string

    @ApiProperty({
        type: String,
    })
    size: string

    @ApiProperty({
        type: Number,
    })
    weight: number

    @ApiProperty({
        type: String,
    })
    finish: string

    @ApiProperty({
        type: String,
    })
    type: string

    @ApiProperty({
        type: Number,
    })
    quantity_on_hand: number

    @ApiProperty({
        type: Number,
    })
    quantity_ordered: number

    @ApiProperty({
        type: String,
    })
    location_id: string

    @ApiProperty({
        type: String,
    })
    storage_type_id: string
}
