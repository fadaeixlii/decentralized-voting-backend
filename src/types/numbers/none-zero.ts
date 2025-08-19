import { Brand } from 'src/types/brand';

import z from 'zod';
export type NoneZero = number & Brand<number, 'NoneZero'>;

export namespace NoneZero {
  export const is = (x: number): x is NoneZero => {
    return (
      x !== 0 && x >= Number.MIN_SAFE_INTEGER && x <= Number.MAX_SAFE_INTEGER
    );
  };
  export const zod = z
    .number()
    .refine(is, { message: 'Value must be a non-zero number' })
    .brand<'NoneZero'>();

  export const mk = (num: number) => (is(num) ? num : undefined);

  export const mkUnsafe = (num: number) => {
    const n = mk(num);
    if (n === undefined) throw new Error('Should be a non-zero number');
    return n;
  };
}
