import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminUserService } from 'src/modules/admin-user/providers/admin-user.service';
import { BcryptHashingService } from 'src/shared/modules/hashing/providers/bcrypt-hashing.service';
import { NonEmptyString, PasswordString } from 'src/types/strings';
import { RequestSessionAuthDto } from '../dtos/request-session-auth.dto';
import { AuthSignInAdminDto } from '../dtos/sign-in-auth.dto';
import { AccessToken } from '../entities/access-token';
import { SessionService } from './session.service';

@Injectable()
export class SignInService {
  constructor(
    // inject admin-user service
    private readonly adminUserService: AdminUserService,

    // inject hashing service
    private readonly hashingService: BcryptHashingService,

    // inject session service
    private readonly sessionService: SessionService,
  ) {}
  async signIn(
    input: AuthSignInAdminDto.AuthSignInAdminInput,
    ctx?: RequestSessionAuthDto.RequestSessionAuthInput,
  ) {
    // find admin-user by username
    const adminUser = await this.validateUser(input.username, input.password);

    const accessTokenPayload: AccessToken.Payload =
      AccessToken.payloadZod.parse({
        sub: adminUser.id,
        email: adminUser.email,
      });

    // generate access token
    const accessToken = AccessToken.generate(accessTokenPayload);
    // generate refresh token

    const { refreshToken } = await this.sessionService.create(adminUser, {
      ua: ctx?.ua,
      ip: ctx?.ip,
    });

    // return access token and refresh token
    return { accessToken, refreshToken };
  }

  async validateUser(username: NonEmptyString, password: PasswordString) {
    const user = await this.adminUserService.findByUsername(username);
    if (
      !user ||
      !(await this.hashingService.compare(
        password,
        NonEmptyString.mkUnsafe(user.password),
      ))
    ) {
      throw new UnauthorizedException('Admin user not found');
    }
    return user;
  }
}
