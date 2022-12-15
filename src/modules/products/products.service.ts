import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Product, ProductDetail } from './product.response';
import { mapToResponse, mapToResponseDetail } from './products.mapper';

@Injectable()
export class ProductsService {
    constructor(private readonly httpService: HttpService) {}

    async findAll() : Promise<Product[]> {
        const response = await this.httpService.axiosRef.get("https://dummyjson.com/products?limit=11");
        const products: Product[] = response.data.products;
        return products.map(mapToResponse);
    }

    async findOne(id: string) : Promise<ProductDetail> {
        const response = await this.httpService.axiosRef.get(`https://dummyjson.com/products/${id}`);
        return mapToResponseDetail(response.data);
    }
}
