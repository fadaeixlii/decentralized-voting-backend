import { Injectable } from '@nestjs/common';
import { AuthSignInAdminDto } from '../dtos/sign-in-auth.dto';
import { AccessToken } from '../entities/access-token';
import { RefreshToken } from '../entities/refresh-token';
import { AuthService } from './auth.service';

@Injectable()
export class SignInService {
  constructor(
    // inject auth service
    private readonly authService: AuthService,
  ) {}

  async signIn(input: AuthSignInAdminDto.AuthSignInAdminInput) {
    // find admin-user by username
    const adminUser = await this.authService.validateUser(
      input.username,
      input.password,
    );

    const accessTokenPayload: AccessToken.Payload =
      AccessToken.payloadZod.parse({
        sub: adminUser.id,
        email: adminUser.email,
      });

    const refreshTokenPayload: RefreshToken.Payload =
      RefreshToken.payloadZod.parse({
        sub: adminUser.id,
      });

    // generate access token
    const accessToken = AccessToken.generate(accessTokenPayload);
    // generate refresh token
    const refreshToken = RefreshToken.generate(refreshTokenPayload);
    // return access token and refresh token
    return { accessToken, refreshToken };
  }
}
