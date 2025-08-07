import z from 'zod';

export const brandSchema = <T, B extends string>(base: z.ZodType<T>) =>
  base.transform((value) => value as Brand<T, B>);

export type Brand<T, B extends string> = T & z.BRAND<B>;
