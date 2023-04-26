import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiCreatedResponse, ApiHeader, ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/Guards/auth.guard';
import { UseGuards } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }


  @Post()
  @ApiCreatedResponse({ description: 'Created successfuly' })
  create() {
    return this.userService.create();
  }

  @ApiHeader({
    name: 'apiKey',
  })
  @UseGuards(AuthGuard)
  @Get()
  @ApiOkResponse({ description: "Retured Successfuly" })
  findAll() {
    return this.userService.findAll();
  }

  @ApiHeader({
    name: 'apiKey',
  })
  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOkResponse({ description: "Retured Successfuly" })
  @ApiNotFoundResponse({ description: "Not Found" })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @ApiHeader({
    name: 'apiKey',
  })
  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiOkResponse({ description: "Updated Successfuly" })
  @ApiNotFoundResponse({ description: "Not Found" })
  update(@Param('id') id: string) {
    return this.userService.update(id);
  }

  @ApiHeader({
    name: 'apiKey',
  })
  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiOkResponse({ description: "Deleated Successfuly" })
  @ApiNotFoundResponse({ description: "Not Found" })
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}

