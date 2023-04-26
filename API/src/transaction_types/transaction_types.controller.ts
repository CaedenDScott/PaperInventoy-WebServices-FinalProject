import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TransactionTypesService } from './transaction_types.service';
import { CreateTransactionTypeDto } from './dto/create-transaction_type.dto';
import { UpdateTransactionTypeDto } from './dto/update-transaction_type.dto';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/Guards/auth.guard';
import { ApiHeader } from '@nestjs/swagger';

@ApiHeader({
    name: 'apiKey',
})
@ApiTags("TransactionTypes")
@Controller('transaction-types')
export class TransactionTypesController {
  constructor(private readonly transactionTypesService: TransactionTypesService) { }

  @UseGuards(AuthGuard)
  @Post()
  @ApiCreatedResponse({description: 'Created successfuly'})
  create(@Body() createTransactionTypeDto: CreateTransactionTypeDto) {
    return this.transactionTypesService.create(createTransactionTypeDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiOkResponse({description: "Retured Successfuly"})
  findAll() {
    return this.transactionTypesService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOkResponse({description: "Retured Successfuly"})
  @ApiNotFoundResponse({description: "Not Found"})
  findOne(@Param('id') id: string) {
    return this.transactionTypesService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiOkResponse({description: "Updated Successfuly"})
  @ApiNotFoundResponse({description: "Not Found"})
  update(@Param('id') id: string, @Body() updateTransactionTypeDto: UpdateTransactionTypeDto) {
    return this.transactionTypesService.update(id, updateTransactionTypeDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiOkResponse({description: "Deleated Successfuly"})
  @ApiNotFoundResponse({description: "Not Found"})
  remove(@Param('id') id: string) {
    return this.transactionTypesService.remove(id);
  }
}
