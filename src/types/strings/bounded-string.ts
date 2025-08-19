import { Brand } from '../brand';
import { NonEmptyString } from './none-empty-string';

export type BoundedString<MIN extends number, MAX extends number> = Brand<
  NonEmptyString,
  'BoundedString'
> & {
  min: MIN;
  max: MAX;
};

export namespace BoundedString {
  export const is =
    <MIN extends number, MAX extends number>(min: MIN, max: MAX) =>
    (str: string): str is BoundedString<MIN, MAX> => {
      return str.length >= min && str.length <= max;
    };

  export const mk = <MIN extends number, MAX extends number>(
    str: string,
    min: MIN,
    max: MAX,
  ): BoundedString<MIN, MAX> | undefined => {
    if (is(min, max)(str)) {
      return str;
    }
  };

  export const mkUnsafe = <MIN extends number, MAX extends number>(
    str: string,
    min: MIN,
    max: MAX,
  ): BoundedString<MIN, MAX> => {
    if (is(min, max)(str)) {
      return str;
    }
    throw new Error('should be non empty string');
  };

  export const zod = <MIN extends number, MAX extends number>(
    min: MIN,
    max: MAX,
  ) =>
    NonEmptyString.zod.refine(is(min, max), {
      message: `Invalid string length. Should be between ${min} and ${max}`,
    });
}
