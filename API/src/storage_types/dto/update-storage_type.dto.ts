import { PartialType } from '@nestjs/mapped-types';
import { CreateStorageTypeDto } from './create-storage_type.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStorageTypeDto extends PartialType(CreateStorageTypeDto) {
    @ApiProperty({
        type: String,
    })
    bound_in: string

    @ApiProperty({
        type: Number,
    })
    quantity: number
}
