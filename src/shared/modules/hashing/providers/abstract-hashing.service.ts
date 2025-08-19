import { Injectable } from '@nestjs/common';
import { IHashingService } from '../interfaces/hashing.interface';
import { NonEmptyString } from 'src/types/strings';

@Injectable()
export abstract class AbstractHashingService implements IHashingService {
  abstract hash(data: NonEmptyString): Promise<NonEmptyString>;
  abstract compare(
    data: NonEmptyString,
    hash: NonEmptyString,
  ): Promise<boolean>;
}
