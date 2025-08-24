import z from 'zod';

export enum AuthType {
  PUBLIC = 'PUBLIC',
  ADMIN_USER = 'ADMIN_USER',
}

export type AuthOptions = {
  type?: AuthType;
  roles?: string[];
};
export namespace AuthOptions {
  export const zod = z.object({
    type: z.enum([AuthType.ADMIN_USER, AuthType.PUBLIC]),
    roles: z.array(z.string()).optional(),
  });
}
