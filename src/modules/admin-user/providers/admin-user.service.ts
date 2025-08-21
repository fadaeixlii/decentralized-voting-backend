import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminUserEntity } from '../entities/admin-user.entity';
import { CreateAdminUserService } from './create-admin-user.service';
import { CreateAdminUserDto } from '../dtos/create-admin-user.dto';

@Injectable()
export class AdminUserService {
  constructor(
    // admin-user repository
    @InjectRepository(AdminUserEntity)
    private readonly repo: Repository<AdminUserEntity>,

    // inject create-admin-user service
    @Inject(forwardRef(() => CreateAdminUserService))
    private readonly createAdminUserService: CreateAdminUserService,
  ) {}

  async register(input: CreateAdminUserDto.Dto) {
    return this.createAdminUserService.create(input);
  }

  async findByEmail(email: string) {
    return this.repo.findOneBy({ email });
  }

  async findByUsername(username: string) {
    return this.repo.findOneBy({ username });
  }
}
