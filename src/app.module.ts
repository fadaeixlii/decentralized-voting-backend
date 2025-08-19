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
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ZodSerializerInterceptor, ZodValidationPipe } from 'nestjs-zod';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({ ...TypeOrmConfig }),
    }),
    // Import your modules here

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
      useClass: ZodSerializerInterceptor,
    },
  ],
})
export class AppModule {}
