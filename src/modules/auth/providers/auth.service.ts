import { Injectable } from '@nestjs/common';
import { CreateAdminUserDto } from 'src/modules/admin-user/dtos/create-admin-user.dto';
import { CreateAdminUserService } from 'src/modules/admin-user/providers/create-admin-user.service';
import { AuthSignInAdminDto } from '../dtos/sign-in-auth.dto';
import { SignInService } from './sign-in.service';
import { RequestSessionAuthDto } from '../dtos/request-session-auth.dto';
import { SessionId } from '../entities/sessionId.domain';
import { SessionService } from './session.service';
import { AccessToken } from '../entities/access-token';
import { RefreshToken } from '../entities/refresh-token';

@Injectable()
export class AuthService {
  constructor(
    // inject create-admin-user service
    private readonly createAdminUserService: CreateAdminUserService,

    // inject sign-in service
    private readonly signInService: SignInService,

    // inject session service
    private readonly sessionService: SessionService,
  ) {}

  async register(input: CreateAdminUserDto.Dto) {
    return this.createAdminUserService.create(input);
  }

  async signIn(
    input: AuthSignInAdminDto.AuthSignInAdminInput,
    ctx?: RequestSessionAuthDto.RequestSessionAuthInput,
  ) {
    return this.signInService.signIn(input, ctx);
  }

  async refresh(
    sessionId: SessionId,
    refreshToken: RefreshToken,
    ctx?: RequestSessionAuthDto.RequestSessionAuthInput,
  ) {
    // rotate
    const {
      refreshToken: newRefreshToken,
      sessionId: newSessionId,
      user: adminUser,
    } = await this.sessionService.rotate(sessionId, refreshToken, ctx);

    // generate new access token
    const accessTokenPayload: AccessToken.Payload =
      AccessToken.payloadZod.parse({
        sub: adminUser.id,
        email: adminUser.email,
      });

    // return new access token and refresh token sessionId

    return {
      accessToken: AccessToken.generate(accessTokenPayload),
      refreshToken: newRefreshToken,
      sessionId: newSessionId,
    };
  }
  async logout(sessionId: SessionId, reason?: string) {
    return this.sessionService.revoke(sessionId, reason);
  }
  async logoutAll(userId: string, reason?: string) {
    return this.sessionService.revokeAll(userId, reason);
  }
}
