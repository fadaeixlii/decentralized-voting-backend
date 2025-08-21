import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminUserEntity } from './entities/admin-user.entity';
import { CreateAdminUserService } from './providers/create-admin-user.service';
import { HashingModule } from 'src/shared/modules/hashing/hashing.module';
import { AuthModule } from '../auth/auth.module';
import { AdminUserService } from './providers/admin-user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminUserEntity]),
    HashingModule,
    forwardRef(() => AuthModule),
  ],
  providers: [CreateAdminUserService, AdminUserService],
  exports: [CreateAdminUserService, AdminUserService],
})
export class AdminUserModule {}
