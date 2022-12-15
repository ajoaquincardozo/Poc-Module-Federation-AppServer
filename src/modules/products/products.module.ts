import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports:[HttpModule],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
