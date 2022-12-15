import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'https://poc-module-federation-app-shell.vercel.app',
      'https://poc-module-federation-products.vercel.app',
    ],
  });
  await app.listen(8080);
}
bootstrap();
