import { z } from 'zod';
import { NonEmptyString, PasswordString } from 'src/types/strings';
import { createZodDto } from 'nestjs-zod';

export type AuthSignInAdminDto = AuthSignInAdminDto.Dto;

export namespace AuthSignInAdminDto {
  export type Dto = z.TypeOf<typeof AuthSignInAdminDto.schema>;

  export const schema = z.object({
    password: PasswordString.zod,
    username: NonEmptyString.zod,
  });

  export class AuthSignInAdminInput extends createZodDto(schema) {}
}
