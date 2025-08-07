import { InternalServerErrorException } from '@nestjs/common';

export class CriticalError extends InternalServerErrorException {
  readonly _tag = 'CriticalError';
  static mk(str: string, metadata: any): CriticalError {
    return new CriticalError(str, { description: JSON.stringify(metadata) });
  }
}
