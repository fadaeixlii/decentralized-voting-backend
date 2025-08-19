import z from 'zod';
import { Brand } from 'src/types/brand';

export type GreaterEqThanZero = number & Brand<number, 'GreaterEqThanZero'>;

export namespace GreaterEqThanZero {
  export const is = (x: number): x is GreaterEqThanZero => {
    return x >= 0 && x <= Number.MAX_SAFE_INTEGER;
  };
  export const zod = z
    .number()
    .refine(is, { message: 'Should be greater equal than zero' })
    .brand<'GreaterEqThanZero'>();

  export const mk = (num: number) => (is(num) ? num : undefined);

  export const mkUnsafe = (num: number) => {
    const n = mk(num);
    if (n === undefined) throw new Error('Should be greater equal than zero');
    return n;
  };
}
