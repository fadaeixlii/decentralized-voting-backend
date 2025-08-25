import { Body, Controller, Ip, Post, Req } from '@nestjs/common';
import { AuthRegisterAdminDto } from '../dtos/auth-register-admin.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthSignInAdminDto } from '../dtos/sign-in-auth.dto';
import { AuthService } from '../providers/auth.service';
import { Request } from 'express';
import { IP, NonEmptyString } from 'src/types/strings';
import { SessionId } from '../entities/sessionId.domain';
import { RefreshToken } from '../entities/refresh-token';
import { Public } from '../decorators/auth.decorator';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    // inject register service
    private readonly authService: AuthService,
  ) {}

  @Post('register-admin')
  @Public()
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
  @Public()
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

  @Post('refresh-admin')
  async refresh(
    @Req() req: Request,
    @Body() body: { refreshToken: string },
    @Ip() ip: IP,
  ) {
    const sessionId = SessionId.mkUnsafe(req.headers['x-session-id'] as string);
    const refreshToken = RefreshToken.mkUnsafe(body.refreshToken);
    return this.authService.refresh(sessionId, refreshToken, {
      ua: NonEmptyString.mkUnsafe(req.headers['user-agent'] as string),
      ip,
    });
  }

  @Post('logout-admin')
  async logout(@Req() req: Request) {
    const sessionId = SessionId.mkUnsafe(req.headers['x-session-id'] as string);
    return this.authService.logout(sessionId);
  }

  @Post('logout-all-admin')
  async logoutAll(@Req() req: Request) {
    const sessionId = SessionId.mkUnsafe(req.headers['x-session-id'] as string);
    return this.authService.logoutAll(sessionId);
  }
}
