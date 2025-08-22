import { z } from 'zod';
import { IP, NonEmptyString } from 'src/types/strings';
import { createZodDto } from 'nestjs-zod';

export type RequestSessionAuthDto = RequestSessionAuthDto.Dto;

export namespace RequestSessionAuthDto {
  export type Dto = z.TypeOf<typeof RequestSessionAuthInput.schema>;

  export const schema = z.object({
    ip: IP.zod.optional(),
    ua: NonEmptyString.zod.optional(),
  });

  export class RequestSessionAuthInput extends createZodDto(schema) {}
}
