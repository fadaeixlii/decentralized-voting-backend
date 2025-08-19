import { Module } from '@nestjs/common';
import { BcryptHashingService } from './providers/bcrypt-hashing.service';

@Module({
  providers: [BcryptHashingService],
  exports: [BcryptHashingService],
  imports: [],
})
export class HashingModule {}
