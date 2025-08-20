import { ConflictException, Injectable } from '@nestjs/common';
import { AdminUserEntity } from '../entities/admin-user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAdminUserDto } from '../dtos/create-admin-user.dto';
import { BcryptHashingService } from 'src/shared/modules/hashing/providers/bcrypt-hashing.service';

@Injectable()
export class CreateAdminUserService {
  constructor(
    // admin-user repository
    @InjectRepository(AdminUserEntity)
    private readonly repo: Repository<AdminUserEntity>,

    // inject hashing service
    private readonly hashingService: BcryptHashingService,
  ) {}

  async create(input: CreateAdminUserDto.Dto) {
    // check if admin-user already exists with email or username
    const existEmail = await this.repo.findOneBy({
      email: input.email,
    });
    if (existEmail) {
      throw new ConflictException('Email already exists');
    }
    const existUsername = await this.repo.findOneBy({
      username: input.username,
    });
    if (existUsername) {
      throw new ConflictException('Username already exists');
    }

    // create admin-user
    const adminUser = this.repo.create({
      ...input,
      password: await this.hashingService.hash(input.password),
    });
    return this.repo
      .save(adminUser)
      .then((adminUser) => adminUser.toAdminUserSimple());
  }
}
