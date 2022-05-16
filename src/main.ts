import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { AppModule } from 'app.module';
import 'reflect-metadata';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const apiVersion = process.env.APP_VERSION ?? 'development';
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    methods: 'GET,PUT,POST,DELETE,OPTIONS',
  });

  const options = new DocumentBuilder()
    .setTitle('Photo album API')
    .setDescription('This is the official API reference guide')
    .setVersion(apiVersion)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document);
  const port = process.env.PORT || 3001;

  await app.listen(port);
}

// eslint-disable-next-line no-void
void bootstrap();
