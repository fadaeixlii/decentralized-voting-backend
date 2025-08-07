import z from 'zod';
import { Brand } from 'src/types/brand';
import { NoneZero } from './none-zero';
import { WholeNumber } from './whole-number';

export type NaturalNumber = NoneZero &
  WholeNumber &
  Brand<number, 'NaturalNumber'>;

export namespace NaturalNumber {
  export const is = (x: number): x is NaturalNumber =>
    NoneZero.is(x) && WholeNumber.is(x);

  export const zod = z
    .number()
    .refine(is, { error: 'Value must be a valid NaturalNumber' })
    .brand<'NaturalNumber'>();

  export const mk = (num: number) => (is(num) ? num : undefined);

  export const mkUnsafe = (num: number) => {
    const n = mk(num);
    if (n === undefined) throw new Error('Should be a valid NaturalNumber');
    return n;
  };
}
