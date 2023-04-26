import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EntityManager } from '@mikro-orm/mysql';
import { Employee } from './entities/employee.entity';
import { Loaded } from '@mikro-orm/core';

@Injectable()
export class EmployeesService {
  constructor(
    private readonly em: EntityManager
  ) { }

  async create(createEmployeeDto: CreateEmployeeDto) {
    const employee = new Employee(createEmployeeDto)

    await this.em.persistAndFlush(employee)

    return employee
  }

  findAll(): Promise<Loaded<Employee[]>> {
    return this.em.find(Employee, {})
  }

  async findOne(id: string): Promise<Loaded<Employee>> {
    const employee = await this.em.findOne(Employee, {id});

    if(!employee) {
      throw new NotFoundException()
    }

    return employee
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<Loaded<Employee>> {
    const employee = await this.em.findOne(Employee, {id});

    if(!employee) {
      throw new NotFoundException()
    }

    if (employee != null) {
      if (updateEmployeeDto.username) {
        employee.username = updateEmployeeDto.username
      }
      if (updateEmployeeDto.password) {
        employee.password = updateEmployeeDto.password
      }
      await this.em.persistAndFlush(employee)
    }

    return employee;
  }

  async remove(id: string): Promise<void> {
    const employee = await this.em.findOne(Employee, {id});

    if(!employee) {
      throw new NotFoundException()
    } else {
      await this.em.removeAndFlush(employee)
    }
  }
}
