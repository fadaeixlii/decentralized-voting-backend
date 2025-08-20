import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppExceptionFilter } from './shared/exceptions/app-exceptions.filter';
import { patchNestJsSwagger, ZodValidationPipe } from 'nestjs-zod';
// import { NextFunction } from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PORT } from './env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1', {
    exclude: [],
  });

  app.useGlobalFilters(new AppExceptionFilter());
  app.useGlobalPipes(new ZodValidationPipe());
  app.enableCors();

  // Ensure patchNestJsSwagger is called before Swagger setup
  patchNestJsSwagger();

  const config = new DocumentBuilder()
    .setVersion('1.0')
    .setTitle('Learning project')
    .setDescription('This project for testing nestjs')
    .addServer(`http://localhost:${PORT}`)
    .setLicense('MIT', 'https://opensource.org/license/MIT')
    .setTermsOfService('https://opensource.org/license/MIT')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    })
    .addSecurityRequirements('bearer')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(PORT);
}
void bootstrap();
