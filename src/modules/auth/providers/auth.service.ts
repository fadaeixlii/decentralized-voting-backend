import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAdminUserDto } from 'src/modules/admin-user/dtos/create-admin-user.dto';
import { CreateAdminUserService } from 'src/modules/admin-user/providers/create-admin-user.service';
import { SignInService } from './sign-in.service';
import { AuthSignInAdminDto } from '../dtos/sign-in-auth.dto';
import { AdminUserService } from 'src/modules/admin-user/providers/admin-user.service';
import { BcryptHashingService } from 'src/shared/modules/hashing/providers/bcrypt-hashing.service';
import { NonEmptyString, PasswordString } from 'src/types/strings';

@Injectable()
export class AuthService {
  constructor(
    // inject create-admin-user service
    private readonly createAdminUserService: CreateAdminUserService,

    // inject sign-in service
    private readonly signInService: SignInService,

    // inject admin-user service
    private readonly adminUserService: AdminUserService,

    // inject hashing service
    private readonly hashingService: BcryptHashingService,
  ) {}

  async register(input: CreateAdminUserDto.Dto) {
    return this.createAdminUserService.create(input);
  }

  async signIn(input: AuthSignInAdminDto.AuthSignInAdminInput) {
    return this.signInService.signIn(input);
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
