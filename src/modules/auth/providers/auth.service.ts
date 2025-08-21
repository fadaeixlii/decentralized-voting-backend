import { Injectable } from '@nestjs/common';
import { CreateAdminUserDto } from 'src/modules/admin-user/dtos/create-admin-user.dto';
import { CreateAdminUserService } from 'src/modules/admin-user/providers/create-admin-user.service';
import { AuthSignInAdminDto } from '../dtos/sign-in-auth.dto';
import { SignInService } from './sign-in.service';

@Injectable()
export class AuthService {
  constructor(
    // inject create-admin-user service
    private readonly createAdminUserService: CreateAdminUserService,

    // inject sign-in service
    private readonly signInService: SignInService,
  ) {}

  async register(input: CreateAdminUserDto.Dto) {
    return this.createAdminUserService.create(input);
  }

  async signIn(input: AuthSignInAdminDto.AuthSignInAdminInput) {
    return this.signInService.signIn(input);
  }
}
