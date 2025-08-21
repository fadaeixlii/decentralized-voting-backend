import { Body, Controller, Post } from '@nestjs/common';
import { AuthRegisterAdminDto } from '../dtos/auth-register-admin.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthSignInAdminDto } from '../dtos/sign-in-auth.dto';
import { AuthService } from '../providers/auth.service';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    // inject register service
    private readonly authService: AuthService,
  ) {}

  @Post('register-admin')
  async registerAdmin(
    @Body() input: AuthRegisterAdminDto.AuthRegisterAdminInput,
  ) {
    return this.authService.register({
      password: input.password,
      username: input.username,
      email: input.email,
    });
  }

  @Post('sign-in-admin')
  async signInAdmin(@Body() input: AuthSignInAdminDto.AuthSignInAdminInput) {
    return this.authService.signIn(input);
  }
}
