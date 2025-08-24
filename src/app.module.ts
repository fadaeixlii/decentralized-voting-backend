import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './shared/typeorm/typeorm.config';
import { ElectionModule } from './modules/election/election.module';
import { ElectionOptionModule } from './modules/election-option/election-option.module';
import { AdminUserModule } from './modules/admin-user/admin-user.module';
import { HashingModule } from './shared/modules/hashing/hashing.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { ResponseInterceptor } from './shared/interceptors/response.interceptor';
import { AccessTokenGuard } from './modules/auth/guards/access-token.guard';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({ ...TypeOrmConfig }),
    }),
    ElectionModule,
    ElectionOptionModule,
    AdminUserModule,
    HashingModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
  ],
})
export class AppModule {}
