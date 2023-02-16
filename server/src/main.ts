import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

const setUpSwagger = (app: INestApplication) => {
  const swaggerDocConfig = new DocumentBuilder()
    .setTitle('DevSocial API')
    .setDescription('DevSocial API')
    .setVersion('1.0')
    .addTag('dev-social')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerDocConfig);
  SwaggerModule.setup('swagger', app, swaggerDocument);
}

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);
  setUpSwagger(app);
  const port = process.env.PORT || 3001;
  await app.setGlobalPrefix('/api').listen(port);
}

bootstrap();
