import { Brand } from 'src/types/brand';

import { Int } from './int';

export type BoundedInt<MIN extends Int, MAX extends Int> = Int &
  Brand<number, 'BoundedInt'> & {
    min: MIN;
    max: MAX;
  };

export namespace BoundedInt {
  export const is =
    <MIN extends Int, MAX extends Int>(min: MIN, max: MAX) =>
    (x: number): x is BoundedInt<MIN, MAX> => {
      return Int.is(x) && Int.is(max) && Int.is(min) && x <= max && x >= min;
    };

  export const zod = <MIN extends Int, MAX extends Int>(min: MIN, max: MAX) =>
    Int.zod.refine(is(min, max), {
      message: `Value must be a valid Int between ${min} and ${max}`,
    });

  export const mk =
    <MIN extends Int, MAX extends Int>(min: MIN, max: MAX) =>
    (num: number) =>
      is(min, max)(num) ? num : undefined;

  export const mkUnsafe =
    <MIN extends Int, MAX extends Int>(min: MIN, max: MAX) =>
    (num: number) => {
      const n = mk(min, max)(num);
      if (n === undefined) throw new Error('Should be a valid BoundedInt');
      return n;
    };
}
