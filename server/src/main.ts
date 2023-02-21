import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

const setUpSwagger = (app: INestApplication, configService: ConfigService) => {
  const appName = configService.get('APP_NAME');
  const swaggerDocConfig = new DocumentBuilder()
    .setTitle(`${appName} API`)
    .setDescription(`${appName} API`)
    .setVersion('1.0')
    .addTag(appName)
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerDocConfig);
  SwaggerModule.setup('swagger', app, swaggerDocument);
}

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get('PORT');

  setUpSwagger(app, configService);
  app.setGlobalPrefix('/api');
  await app.listen(port, () => console.log(`Server is running on port ${port}`));
}

bootstrap();
