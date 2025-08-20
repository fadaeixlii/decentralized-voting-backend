import { Email, NonEmptyString, PasswordString, UUID } from 'src/types/strings';

export namespace AdminUserDomain {
  export type Base = {
    id: UUID;
    username: NonEmptyString;
    password: PasswordString;
    email: Email;
    is_active?: boolean | null;
    last_login?: Date | null;
    isVerified?: boolean | null;
    avatar?: string | null;
  };

  export type Simple = Omit<Base, 'password'>;
}
