import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  SwaggerModule.setup(
    'docs',
    app,
    SwaggerModule.createDocument(app, new DocumentBuilder().build())
  );

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
