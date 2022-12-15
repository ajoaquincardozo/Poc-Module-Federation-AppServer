import { Controller, Get, Param } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Product, ProductDetail } from './product.response';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async index(): Promise<Product[]> {
    return await this.productsService.findAll();
  }

  @Get(":id")
  async getOne(@Param("id") id: string): Promise<ProductDetail> {
    return await this.productsService.findOne(id);
  }
}
