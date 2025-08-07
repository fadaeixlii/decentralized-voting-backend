import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppExceptionFilter } from './shared/exceptions/app-exceptions.filter';
import { patchNestJsSwagger, ZodValidationPipe } from 'nestjs-zod';
// import { NextFunction } from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1', {
    exclude: [], // Exclude this route from the global prefix
  });

  app.useGlobalFilters(new AppExceptionFilter()); // Use the global filter

  app.useGlobalPipes(new ZodValidationPipe());

  app.enableCors();

  // app.use((_req: Request, res: Response, next: NextFunction) => {
  //   res.headers['Access-Control-Allow-Origin'] = '*';
  //   res.headers['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE';
  //   res.headers['Access-Control-Allow-Headers'] = 'Content-Type, Accept';
  //   res.headers['Content-Security-Policy'] = "'default-src 'none'";
  //   res.headers['Content-Security-Policy'] =
  //     "default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; font-src 'self' data:;";

  //   next();
  // });

  patchNestJsSwagger();

  const config = new DocumentBuilder()
    .setVersion('1.0')
    .setTitle('Learning project')
    .setDescription('This project for testing nestjs')
    .addServer(`http://localhost:${process.env.PORT ?? 3130}`)
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

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
