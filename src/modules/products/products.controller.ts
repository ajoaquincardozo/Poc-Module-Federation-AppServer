import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { Product, ProductDetail } from './product.response';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async index(): Promise<Product[]> {
    return await this.productsService.findAll();
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  async getOne(@Param("id") id: string): Promise<ProductDetail> {
    return await this.productsService.findOne(id);
  }
}
