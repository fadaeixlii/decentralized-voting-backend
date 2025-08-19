import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './shared/typeorm/typeorm.config';
import { ElectionModule } from './modules/election/election.module';
import { ElectionOptionModule } from './modules/election-option/election-option.module';
import { AdminUserModule } from './modules/admin-user/admin-user.module';
import { HashingModule } from './shared/modules/hashing/hashing.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
