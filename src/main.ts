import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'https://poc-module-federation-app-shell.vercel.app',
      // 'https://poc-module-federation-products.vercel.app',
      'http://localhost:8080',
      // 'http://localhost:3000',
    ],
  });
  await app.listen(8081);
}
bootstrap();
