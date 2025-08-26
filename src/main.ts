import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppExceptionFilter } from './shared/exceptions/app-exceptions.filter';
import { patchNestJsSwagger, ZodValidationPipe } from 'nestjs-zod';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PORT } from './env';
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setGlobalPrefix('api/v1', {
    exclude: ['api-docs', 'docs-json'], // Exclude Swagger paths from the global prefix
  });

  app.useGlobalFilters(new AppExceptionFilter());
  app.useGlobalPipes(new ZodValidationPipe());
  app.enableCors();
  // Apply AuthGuard globally
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new AuthGuard(reflector));

  // Serve static files from the public directory
  app.useStaticAssets(join(__dirname, '..', 'src', 'public'));

  // Ensure patchNestJsSwagger is called before Swagger setup
  patchNestJsSwagger();

  const config = new DocumentBuilder()
    .setVersion('1.0')
    .setTitle('Decentralized Voting')
    .setDescription('Decentralized Voting API')
    .addServer(`http://localhost:${PORT}`)
    .setLicense('MIT', 'https://opensource.org/license/MIT')
    .setTermsOfService('https://opensource.org/license/MIT')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Access token',
      },
      'access-token',
    )
    .addSecurityRequirements('access-token')
    .addApiKey(
      {
        type: 'apiKey',
        in: 'header',
        name: 'X-Session-Id',
        description: 'Session identifier',
      },
      'session-id',
    )
    .addSecurityRequirements('session-id')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Setup Swagger with custom options
  SwaggerModule.setup('api-docs', app, document, {
    customJs: '/swagger-initializer.js',
    customSiteTitle: 'Decentralized Voting API',
    swaggerOptions: {
      persistAuthorization: true,
    },
    useGlobalPrefix: false,
  });

  await app.listen(PORT);
}
void bootstrap();
