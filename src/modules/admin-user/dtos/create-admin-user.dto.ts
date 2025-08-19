import { z } from 'zod';
import { Email, NonEmptyString, PasswordString } from 'src/types/strings';
import { createZodDto } from 'nestjs-zod';

export type CreateAdminUserDto = CreateAdminUserDto.Dto;

export namespace CreateAdminUserDto {
  export type Dto = z.TypeOf<typeof CreateAdminUserDto.schema>;

  export const schema = z.object({
    password: PasswordString.zod,
    username: NonEmptyString.zod,
    email: Email.zod,
    is_active: z.boolean().default(false).optional(),
    isVerified: z.boolean().default(false).optional(),
    avatar: z.string().optional(),
  });

  export class CreateAdminUserDto extends createZodDto(schema) {}
}
