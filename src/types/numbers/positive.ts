import { Brand } from 'src/types/brand';

import { GreaterEqThanZero } from './greater-eq-than-zero';

export type Positive = GreaterEqThanZero & Brand<number, 'Positive'>;

export namespace Positive {
  export const is = (x: number): x is Positive => {
    return GreaterEqThanZero.is(x) && x > 0;
  };
  export const zod = GreaterEqThanZero.zod
    .refine(is, { error: 'Value must be a valid Positive number' })
    .brand<'Positive'>();

  export const mk = (num: number) => (is(num) ? num : undefined);

  export const mkUnsafe = (num: number) => {
    const n = mk(num);
    if (n === undefined) throw new Error('Should be a valid Positive number');
    return n;
  };
}
