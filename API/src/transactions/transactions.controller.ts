import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/Guards/auth.guard';
import { ApiHeader } from '@nestjs/swagger';

@ApiHeader({
    name: 'apiKey',
})

@ApiTags("Transactions")
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) { }

  @UseGuards(AuthGuard)
  @Post()
  @ApiCreatedResponse({description: 'Created successfuly'})
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiOkResponse({description: "Retured Successfuly"})
  findAll() {
    return this.transactionsService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOkResponse({description: "Retured Successfuly"})
  @ApiNotFoundResponse({description: "Not Found"})
  findOne(@Param('id') id: string) {
    return this.transactionsService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiOkResponse({description: "Updated Successfuly"})
  @ApiNotFoundResponse({description: "Not Found"})
  update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
    return this.transactionsService.update(id, updateTransactionDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiOkResponse({description: "Deleated Successfuly"})
  @ApiNotFoundResponse({description: "Not Found"})
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(id);
  }
}
