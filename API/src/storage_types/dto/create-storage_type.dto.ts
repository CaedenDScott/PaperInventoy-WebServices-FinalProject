import { ApiProperty } from "@nestjs/swagger"

export class CreateStorageTypeDto {
    @ApiProperty({
        type: String,
    })
    bound_in: string

    @ApiProperty({
        type: Number,
    })
    quantity: number
}
