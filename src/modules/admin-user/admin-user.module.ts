import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminUserEntity } from './entities/admin-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdminUserEntity])],
  controllers: [],
  providers: [],
  exports: [],
})
export class AdminUserModule {}
