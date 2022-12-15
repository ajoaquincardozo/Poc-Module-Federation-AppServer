import {
  Controller,
  Get,
  Request,
  UseGuards,
  Post,
  Body,
  Delete
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { Product } from '../products/product.response';
import { ProductsService } from '../products/products.service';

interface CartItem extends Product {
  quantity: number;
}

interface Cart {
  CartItems: CartItem[];
}

const initialCart = (indexes: number[], products: Product[]): Cart => ({
  CartItems: indexes.map((index) => ({
    ...products[index],
    quantity: 1
  }))
});

@Controller('cart')
export class CartController {
  private carts: Record<number, number[]> = {
    1: [0, 2, 4],
    2: [1, 3]
  };

  private cache: Record<number, Cart> = {};

  constructor(private readonly productsService: ProductsService) {}

  async getCart(@Request() req) : Promise<Cart> {
    const indexes: number[] = this.carts[req.user.userId];

    if (!indexes)
      return null;

    const cartInCache = this.cache[req.user.userId];
    if (cartInCache)
      return cartInCache;

    const cart = initialCart(indexes, await this.productsService.findAll());
    this.cache[req.user.userId] = cart;
    return cart;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async index(@Request() req): Promise<Cart> {
    return this.getCart(req);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Request() req, @Body() { id }: { id: string }): Promise<Cart> {
    const cart = await this.getCart(req);
    const cartItem = cart.CartItems.find((cartItem) => cartItem.id === parseInt(id));

    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      const products = await this.productsService.findAll();
      cart.CartItems.push({
        ...products.find((product) => product.id === parseInt(id)),
        quantity: 1,
      })
    }

    return cart;
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  async destroy(@Request() req): Promise<Cart> {
    const cart = await this.getCart(req);
    cart.CartItems = [];
    return cart;
  }
}
