import z from 'zod';
import { Brand } from '../brand';
import { v4 } from 'uuid';

export type UUID = string & Brand<string, 'UUID'>;

export namespace UUID {
  export const UUID_regex =
    /^[0-9A-Fa-f]{8}(-[0-9A-Fa-f]{4}){3}-[0-9A-Fa-f]{12}$/;
  export function is(x: string): x is UUID {
    return z
      .string()
      .refine((uuid) => UUID_regex.test(uuid.trim()), {
        message: 'It should be like UUID ',
      })
      .safeParse(x).success;
  }

  export const zod = z.string().refine(is, { message: 'Should be like UUID' });

  export const mk = (x: string) => (is(x) ? x : undefined);

  export const mkUnsafe = (x: string) => {
    const n = mk(x);
    if (n === undefined) throw new Error('Should be like UUID');
    return n;
  };

  export const generate = () => UUID.mkUnsafe(v4());
}
