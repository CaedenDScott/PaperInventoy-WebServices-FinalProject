import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { StorageTypesService } from './storage_types.service';
import { CreateStorageTypeDto } from './dto/create-storage_type.dto';
import { UpdateStorageTypeDto } from './dto/update-storage_type.dto';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/Guards/auth.guard';
import { ApiHeader } from '@nestjs/swagger';

@ApiHeader({
    name: 'apiKey',
})
@ApiTags("StorageTypes")
@Controller('storage-types')
export class StorageTypesController {
  constructor(private readonly storageTypesService: StorageTypesService) { }

  @UseGuards(AuthGuard)
  @Post()
  @ApiCreatedResponse({description: 'Created successfuly'})
  create(@Body() createStorageTypeDto: CreateStorageTypeDto) {
    return this.storageTypesService.create(createStorageTypeDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiOkResponse({description: "Retured Successfuly"})
  findAll() {
    return this.storageTypesService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOkResponse({description: "Retured Successfuly"})
  @ApiNotFoundResponse({description: "Not Found"})
  findOne(@Param('id') id: string) {
    return this.storageTypesService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiOkResponse({description: "Updated Successfuly"})
  @ApiNotFoundResponse({description: "Not Found"})
  update(@Param('id') id: string, @Body() updateStorageTypeDto: UpdateStorageTypeDto) {
    return this.storageTypesService.update(id, updateStorageTypeDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiOkResponse({description: "Deleated Successfuly"})
  @ApiNotFoundResponse({description: "Not Found"})
  remove(@Param('id') id: string) {
    return this.storageTypesService.remove(id);
  }
}
