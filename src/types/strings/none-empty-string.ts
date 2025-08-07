import z from 'zod';
import { Brand } from '../brand';

export type NonEmptyString = string & Brand<string, 'NonEmptyString'>;

export namespace NonEmptyString {
  export function is(x: string): x is NonEmptyString {
    return x.trim().length > 0;
  }

  export const zod = z
    .string()
    .refine(is, {
      message: 'String cannot be empty',
    })
    .brand<'NonEmptyString'>();

  export const mk = (x: string) => (is(x) ? x : undefined);

  export const mkUnsafe = (x: string) => {
    const n = mk(x);
    if (n === undefined) throw new Error('String cannot be empty');
    return n;
  };
}
