import z from 'zod';
import { Brand } from '../brand';

export type Email = Brand<string, 'Email'>;

export namespace Email {
  export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  export function is(x: string): x is Email {
    return emailRegex.test(x.trim());
  }

  export const zod = z
    .string()
    .refine(is, { error: 'Should be a valid email' });

  export const mk = (x: string): Email | undefined => (is(x) ? x : undefined);
  export const mkUnsafe = (x: string): Email => {
    const n = mk(x);
    if (n === undefined) throw new Error('Should be a valid email');
    return n;
  };
}
