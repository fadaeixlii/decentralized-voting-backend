import z from 'zod';
import { Brand } from 'src/types/brand';

export type BoundedNumber<MIN extends number, MAX extends number> = number &
  Brand<number, 'BoundedNumber'> & {
    min: MIN;
    max: MAX;
  };

export namespace BoundedNumber {
  export const is =
    <MIN extends number, MAX extends number>(min: MIN, max: MAX) =>
    (x: number): x is BoundedNumber<MIN, MAX> => {
      return (
        x <= max &&
        x >= min &&
        x >= Number.MIN_SAFE_INTEGER &&
        x <= Number.MAX_SAFE_INTEGER
      );
    };

  export const zod = <MIN extends number, MAX extends number>(
    min: MIN,
    max: MAX,
  ) =>
    z.number().refine(is(min, max), {
      error: `Value must be a valid Number between ${min} and ${max}`,
    });

  export const mk =
    <MIN extends number, MAX extends number>(min: MIN, max: MAX) =>
    (num: number) =>
      is(min, max)(num) ? num : undefined;

  export const mkUnsafe =
    <MIN extends number, MAX extends number>(min: MIN, max: MAX) =>
    (num: number) => {
      const n = mk(min, max)(num);
      if (n === undefined) throw new Error('Should be a valid BoundedNumber');
      return n;
    };
}
