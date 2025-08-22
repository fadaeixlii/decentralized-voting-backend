import z from 'zod';
import { Brand } from '../brand';
import { NonEmptyString } from './none-empty-string';

export type IP = Brand<NonEmptyString, 'IP'>;

export namespace IP {
  export const ipRegex = /^(([0-9]{1,3}\.){3}[0-9]{1,3})$/;

  export const is = (x: NonEmptyString): x is IP => {
    return ipRegex.test(x.trim());
  };

  export const mk = (x: NonEmptyString) => (is(x) ? x : undefined);

  export const mkUnsafe = (x: NonEmptyString) => {
    if (!is(x)) throw new Error('Invalid IP');
    return x;
  };

  export const zod = z.string().refine(is, {
    message: 'Invalid IP',
  });
}
