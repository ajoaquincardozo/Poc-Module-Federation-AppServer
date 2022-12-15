import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'
import { ProductsService } from '../products/products.service';

import { CartController } from './cart.controller';

@Module({
  imports:[HttpModule],
  controllers: [CartController],
  providers: [ProductsService]
})
export class CartModule {}
