import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeDto } from './create-employee.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {
    @ApiProperty({
        type: String,
    })
    username: string

    @ApiProperty({
        type: String,
    })
    password: string
}
