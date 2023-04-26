import { ApiProperty } from "@nestjs/swagger";

export class CreateRoomDto {
    @ApiProperty({
        type: String,
    })
    room_name: string
}
