import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/Guards/auth.guard';
import { ApiHeader } from '@nestjs/swagger';

@ApiHeader({
    name: 'apiKey',
})
@ApiTags("Employee")
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) { }

  @UseGuards(AuthGuard)
  @Post()
  @ApiCreatedResponse({description: 'Created successfuly'})
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiOkResponse({description: "Retured Successfuly"})
  findAll() {
    return this.employeesService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOkResponse({description: "Retured Successfuly"})
  @ApiNotFoundResponse({description: "Not Found"})
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiOkResponse({description: "Updated Successfuly"})
  @ApiNotFoundResponse({description: "Not Found"})
  update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeesService.update(id, updateEmployeeDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiOkResponse({description: "Deleated Successfuly"})
  @ApiNotFoundResponse({description: "Not Found"})
  remove(@Param('id') id: string) {
    return this.employeesService.remove(id);
  }
}
