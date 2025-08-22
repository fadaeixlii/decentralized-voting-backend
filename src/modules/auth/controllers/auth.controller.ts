import { Body, Controller, Ip, Post, Req } from '@nestjs/common';
import { AuthRegisterAdminDto } from '../dtos/auth-register-admin.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthSignInAdminDto } from '../dtos/sign-in-auth.dto';
import { AuthService } from '../providers/auth.service';
import { Request } from 'express';
import { IP, NonEmptyString } from 'src/types/strings';

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
  async signInAdmin(
    @Body() input: AuthSignInAdminDto.AuthSignInAdminInput,
    @Ip() ip: IP,
    @Req() request: Request,
  ) {
    return this.authService.signIn(input, {
      ip,
      ua: NonEmptyString.mk(request?.headers?.['user-agent'] as string),
    });
  }
}
