import { NonEmptyString } from 'src/types/strings';

export interface IHashingService {
  hash(data: NonEmptyString): Promise<NonEmptyString>;
  compare(data: NonEmptyString, hash: NonEmptyString): Promise<boolean>;
}
