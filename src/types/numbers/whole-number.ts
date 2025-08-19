import { Brand } from 'src/types/brand';

import { GreaterEqThanZero } from './greater-eq-than-zero';
import { Int } from './int';

export type WholeNumber = Int &
  GreaterEqThanZero &
  Brand<number, 'WholeNumber'>;

export namespace WholeNumber {
  export const is = (x: number): x is WholeNumber =>
    Int.is(x) && GreaterEqThanZero.is(x);

  export const zod = Int.zod
    .refine(is, { message: 'Value must be a valid WholeNumber' })
    .brand<'WholeNumber'>();
  export const mk = (num: number) => (is(num) ? num : undefined);

  export const mkUnsafe = (num: number) => {
    const n = mk(num);
    if (n === undefined) throw new Error('Should be a valid WholeNumber');
    return n;
  };
}
