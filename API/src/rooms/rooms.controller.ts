import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/Guards/auth.guard';
import { ApiHeader } from '@nestjs/swagger';

@ApiHeader({
    name: 'apiKey',
})
@ApiTags("Rooms")
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) { }

  @UseGuards(AuthGuard)
  @Post()
  @ApiCreatedResponse({description: 'Created successfuly'})
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiOkResponse({description: "Retured Successfuly"})
  findAll() {
    return this.roomsService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOkResponse({description: "Retured Successfuly"})
  @ApiNotFoundResponse({description: "Not Found"})
  findOne(@Param('id') id: string) {
    return this.roomsService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiOkResponse({description: "Updated Successfuly"})
  @ApiNotFoundResponse({description: "Not Found"})
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(id, updateRoomDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiOkResponse({description: "Deleated Successfuly"})
  @ApiNotFoundResponse({description: "Not Found"})
  remove(@Param('id') id: string) {
    return this.roomsService.remove(id);
  }
}
