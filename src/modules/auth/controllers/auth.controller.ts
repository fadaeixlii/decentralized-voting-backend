import { Body, Controller, Post } from '@nestjs/common';
import { AuthRegisterAdminDto } from '../dtos/auth-register-admin.dto';
import { ApiTags } from '@nestjs/swagger';
import { RegisterService } from '../providers/register.service';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    // inject register service
    private readonly registerService: RegisterService,
  ) {}

  @Post('register-admin')
  async registerAdmin(
    @Body() input: AuthRegisterAdminDto.AuthRegisterAdminInput,
  ) {
    return this.registerService.register({
      password: input.password,
      username: input.username,
      email: input.email,
    });
  }
}
