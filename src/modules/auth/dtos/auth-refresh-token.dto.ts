import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { JwtToken } from 'src/types/jwt-token';

export type AuthRefreshTokenDto = AuthRefreshTokenDto.Dto;

export namespace AuthRefreshTokenDto {
  export type Dto = z.TypeOf<typeof AuthRefreshTokenDto.schema>;

  export const schema = z.object({
    refreshToken: JwtToken.zod,
  });

  export class AuthRefreshTokenInput extends createZodDto(schema) {}
}
