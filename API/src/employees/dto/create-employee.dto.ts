import { ApiProperty } from "@nestjs/swagger"

export class CreateEmployeeDto {
    @ApiProperty({
        type: String,
    })
    username: string

    @ApiProperty({
        type: String,
    })
    password: string
}
