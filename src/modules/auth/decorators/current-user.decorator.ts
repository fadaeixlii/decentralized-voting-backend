import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { AccessToken } from '../entities/access-token';
import { USER_KEY } from '../guards/access-token.guard';
import { NonEmptyString, UUID } from 'src/types/strings';

export const CurrentUser = createParamDecorator(
  (
    data: keyof AccessToken.Payload | undefined,
    ctx: ExecutionContext,
  ): AccessToken.FullPayload | UUID | NonEmptyString | string | undefined => {
    const request = ctx.switchToHttp().getRequest<Request>();

    const payload = request?.[USER_KEY] as AccessToken.FullPayload;
    return data ? payload?.[data] : payload;
  },
);
