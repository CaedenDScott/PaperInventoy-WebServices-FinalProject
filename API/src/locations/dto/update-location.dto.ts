import { PartialType } from '@nestjs/mapped-types';
import { CreateLocationDto } from './create-location.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateLocationDto extends PartialType(CreateLocationDto) {
    @ApiProperty({
        type: String,
    })
    room_id: string

    @ApiProperty({
        type: String,
    })
    location_name: string
}
