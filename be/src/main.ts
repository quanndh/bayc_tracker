import { NestFactory } from '@nestjs/core';
import { HttpExceptionFilter } from 'src/middlewares/HttpExceptionFilter';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger:
      process.env.NODE_ENV === 'development' ? ['error', 'warn', 'debug'] : [],
    cors:
      process.env.NODE_ENV === 'development'
        ? {
            origin: [
              'http://localhost:3000',
              'http://localhost:3001',
              'http://localhost',
              'http://127.0.0.1:5173',
            ],
            credentials: true,
          }
        : {
            origin: [],
            credentials: true,
          },
  });

  app.setGlobalPrefix('/api');

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(process.env.PORT ?? 3000);
  console.log('App start at:', await app.getUrl());
}
bootstrap();
