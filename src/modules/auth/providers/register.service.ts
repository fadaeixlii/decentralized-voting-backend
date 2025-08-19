import { Injectable } from '@nestjs/common';
import { CreateAdminUserDto } from 'src/modules/admin-user/dtos/create-admin-user.dto';
import { CreateAdminUserService } from 'src/modules/admin-user/providers/create-admin-user.service';

@Injectable()
export class RegisterService {
  constructor(
    // inject admin-user service
    private readonly adminUserService: CreateAdminUserService,
  ) {}

  async register(input: CreateAdminUserDto.Dto) {
    return this.adminUserService.create(input);
  }
}
