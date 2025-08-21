import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminUserService } from 'src/modules/admin-user/providers/admin-user.service';
import { BcryptHashingService } from 'src/shared/modules/hashing/providers/bcrypt-hashing.service';
import { NonEmptyString } from 'src/types/strings';
import { AccessToken } from '../entities/access-token';
import { RefreshToken } from '../entities/refresh-token';
import { AuthSignInAdminDto } from '../dtos/sign-in-auth.dto';

@Injectable()
export class SignInService {
  constructor(
    // inject admin-user service
    private readonly authService: AdminUserService,

    // inject hashing service
    private readonly hashingService: BcryptHashingService,
  ) {}

  async signIn(input: AuthSignInAdminDto.AuthSignInAdminInput) {
    // find admin-user by username
    const adminUser = await this.authService.findByUsername(input.username);
    if (
      !adminUser ||
      !(await this.hashingService.compare(
        input.password,
        NonEmptyString.mkUnsafe(adminUser.password),
      ))
    ) {
      throw new UnauthorizedException('Admin user not found');
    }

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
