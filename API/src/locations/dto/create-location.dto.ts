import { ApiProperty } from "@nestjs/swagger"

export class CreateLocationDto {
    @ApiProperty({
        type: String,
    })
    room_id: string
    @ApiProperty({
        type: String,
    })
    location_name: string
}
