import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const config = new DocumentBuilder()
    .setTitle('PaperInventory')
    .setDescription('A paper inventory system for College Press')
    .setVersion('1.0')
    .addTag('Employee')
    .addTag('Locations')
    .addTag('Papers')
    .addTag('Rooms')
    .addTag('StorageTypes')
    .addTag('TransactionTypes')
    .addTag('Transactions')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
