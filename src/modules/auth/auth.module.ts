import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AdminUserModule } from 'src/modules/admin-user/admin-user.module';
import { RegisterService } from './providers/register.service';

@Module({
  controllers: [AuthController],
  imports: [forwardRef(() => AdminUserModule)],
  providers: [RegisterService],
  exports: [RegisterService],
})
export class AuthModule {}
