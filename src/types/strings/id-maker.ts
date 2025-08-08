import { z } from 'zod';
import { UUID } from './uuid';
import { Brand } from '../brand';

export namespace IdMaker {
  export const mk = <X extends string>() => {
    type Id = Brand<UUID, X>;
    const is = (id: string): id is Id => UUID.is(id);
    const zod = z.coerce.string().refine(is, { message: 'IdMaker' });

    const mk = (id: string) => (is(id) ? id : undefined);

    const mkUnsafe = (id: string): Id => id as Id;
    return { is, zod, mk, mkUnsafe };
  };

  export type Infer<A extends ReturnType<typeof mk>> = A extends {
    mkUnsafe: (x: string) => infer B;
  }
    ? B
    : never;
}
