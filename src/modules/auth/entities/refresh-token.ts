import {
  REFRESH_TOKEN_AUDIENCE,
  REFRESH_TOKEN_EXPIRY,
  REFRESH_TOKEN_ISSUER,
  REFRESH_TOKEN_SECRET,
} from 'src/env';
import { Brand } from 'src/types/brand';
import { JwtToken } from 'src/types/jwt-token';
import { NaturalNumber } from 'src/types/numbers';
import { NonEmptyString, UUID } from 'src/types/strings';
import z from 'zod';

export type RefreshToken = Brand<JwtToken, 'RefreshToken'>;

export namespace RefreshToken {
  export type Payload = {
    sub: UUID;
  };

  export const payloadZod = z.object({
    sub: UUID.zod,
  });

  export const is = (x: string): x is RefreshToken => {
    return JwtToken.is(x);
  };

  export const mk = (x: string): RefreshToken | undefined => {
    if (!is(x)) return undefined;
    return x;
  };

  export const mkUnsafe = (x: string): RefreshToken => {
    const n = mk(x);
    if (n === undefined) throw new Error('Should be a valid JWT token');
    return n;
  };

  export const config: JwtToken.ConfigType = {
    secret: NonEmptyString.mkUnsafe(REFRESH_TOKEN_SECRET),
    ttl: NaturalNumber.mkUnsafe(REFRESH_TOKEN_EXPIRY),
    issuer: NonEmptyString.mkUnsafe(REFRESH_TOKEN_ISSUER),
    audience: NonEmptyString.mkUnsafe(REFRESH_TOKEN_AUDIENCE),
  };

  export const generate = (payload: Payload): RefreshToken => {
    return RefreshToken.mkUnsafe(JwtToken.sign(payload, config));
  };

  export const verify = (token: RefreshToken): Payload => {
    const decoded = JwtToken.verify(token, config.secret);
    return payloadZod.parse(decoded);
  };
}
