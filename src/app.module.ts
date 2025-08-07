import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './shared/typeorm/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({ ...TypeOrmConfig }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
