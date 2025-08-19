import { z } from 'zod';
import { Email, NonEmptyString, PasswordString } from 'src/types/strings';
import { createZodDto } from 'nestjs-zod';

export type AuthRegisterAdminDto = AuthRegisterAdminDto.Dto;

export namespace AuthRegisterAdminDto {
  export type Dto = z.TypeOf<typeof AuthRegisterAdminDto.schema>;

  export const schema = z.object({
    password: PasswordString.zod,
    username: NonEmptyString.zod,
    email: Email.zod,
  });

  export class AuthRegisterAdminInput extends createZodDto(schema) {}
}
