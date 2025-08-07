import z from 'zod';
import { Brand } from 'src/types/brand';

export type Int = Brand<number, 'Int'>;

export namespace Int {
  export const is = (x: number): x is Int => {
    return (
      Number.isInteger(x) &&
      x >= Number.MIN_SAFE_INTEGER &&
      x <= Number.MAX_SAFE_INTEGER
    );
  };
  export const zod = z
    .number()
    .refine(is, { error: 'Value must be a valid Int' })
    .brand<'Int'>();

  export const mk = (num: number) => (is(num) ? num : undefined);

  export const mkUnsafe = (num: number) => {
    const n = mk(num);
    if (n === undefined) throw new Error('Should Integer value expected');
    return n;
  };
}
