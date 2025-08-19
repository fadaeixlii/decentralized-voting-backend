import { Brand } from '../brand';
import { Int } from '../numbers';
import { BoundedString } from './bounded-string';

const MIN_PASSWORD_LENGTH: Int = Int.mkUnsafe(8);
const MAX_PASSWORD_LENGTH: Int = Int.mkUnsafe(96);

export type PasswordString = Brand<
  BoundedString<typeof MIN_PASSWORD_LENGTH, typeof MAX_PASSWORD_LENGTH>,
  'PasswordString'
>;
export namespace PasswordString {
  export const strongPassword = new RegExp(
    `(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{${MIN_PASSWORD_LENGTH},${MAX_PASSWORD_LENGTH}})`,
  );
  export const is = (password: string): password is PasswordString => {
    if (!BoundedString.is(MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH)(password))
      return false;
    if (!strongPassword.test(password)) return false;
    return true;
  };
  export const zod = BoundedString.zod(
    MIN_PASSWORD_LENGTH,
    MAX_PASSWORD_LENGTH,
  ).refine(is, {
    message:
      'Invalid password string. Should be between 8 and 96 characters, and contain at least one lowercase letter, one uppercase letter, one number, and one special character',
  });

  export const mk = (password: string): PasswordString | undefined => {
    if (is(password)) {
      return password;
    }
  };

  export const mkUnsafe = (password: string): PasswordString => {
    const p = mk(password);
    if (!p) throw new Error('should be strong password string');
    return p;
  };
}
