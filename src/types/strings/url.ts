import z from 'zod';
import { Brand } from '../brand';

export type Url = Brand<string, 'Url'>;

export namespace Url {
  export const urlRegex =
    /^(?:(?:https?):\/\/)?(?:(?:[1-9]\d{0,2}(?:\.(?:[0-9]\d{0,2})){3})|(?:[a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.[a-zA-Z]{2,})(?::\d{1,5})?(?:[/?#]\S*)?$/i;
  export function is(x: string): x is Url {
    return z
      .string()
      .refine((url) => urlRegex.test(url.trim()), {
        error: 'Should be Valid URL',
      })
      .safeParse(x).success;
  }
  export const zod = z.string().refine(is, {
    error: 'Should be Valid URL',
  });

  export const mk = (x: string) => (is(x) ? x : undefined);

  export const mkUnsafe = (x: string) => {
    const n = mk(x);
    if (n === undefined) throw new Error('Should be valid URL');
    return n;
  };
}
