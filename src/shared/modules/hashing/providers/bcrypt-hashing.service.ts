import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { AbstractHashingService } from './abstract-hashing.service';
import { NaturalNumber } from 'src/types/numbers';
import { NonEmptyString } from 'src/types/strings';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptHashingService implements AbstractHashingService {
  private readonly saltRounds: NaturalNumber = NaturalNumber.mkUnsafe(10);

  async hash(data: NonEmptyString): Promise<NonEmptyString> {
    try {
      if (!data) throw new BadRequestException('Data to hash cannot be empty');
      const salt = await bcrypt.genSalt(this.saltRounds);
      return NonEmptyString.mkUnsafe(await bcrypt.hash(data, salt));
    } catch (error) {
      throw new InternalServerErrorException('Hashing failed', {
        description: 'An error occurred while hashing the data',
        cause: error,
      });
    }
  }
  compare(data: NonEmptyString, hash: NonEmptyString): Promise<boolean> {
    if (!data || !hash) {
      throw new BadRequestException('Data and hash cannot be empty');
    }
    return bcrypt.compare(data, hash);
  }
}
