import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminUserEntity } from './entities/admin-user.entity';
import { CreateAdminUserService } from './providers/create-admin-user.service';
import { HashingModule } from 'src/shared/modules/hashing/hashing.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminUserEntity]),
    HashingModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [],
  providers: [CreateAdminUserService],
  exports: [CreateAdminUserService],
})
export class AdminUserModule {}
