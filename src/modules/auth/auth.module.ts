import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AdminUserModule } from 'src/modules/admin-user/admin-user.module';
import { RegisterService } from './providers/register.service';
import { HashingModule } from 'src/shared/modules/hashing/hashing.module';
import { AuthService } from './providers/auth.service';
import { SignInService } from './providers/sign-in.service';

@Module({
  controllers: [AuthController],
  imports: [forwardRef(() => AdminUserModule), HashingModule],
  providers: [RegisterService, SignInService, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
