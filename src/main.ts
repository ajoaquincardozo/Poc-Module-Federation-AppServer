import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const allowedUrls = [
    'https://poc-module-federation-app-shell.vercel.app',
    // 'https://poc-module-federation-products.vercel.app',
    'https://localhost:8080',
    'https://127.0.0.1:8080',
    'http://localhost:65506',
    'https://localhost:8082',
    // 'http://localhost:3000',
    "https://poc-iframe-app-shell.vercel.app",
    "https://poc-iframe-products.vercel.app"
  ];

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || allowedUrls.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
  });
  await app.listen(8081);
}
bootstrap();
