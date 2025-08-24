import {
  ACCESS_TOKEN_AUDIENCE,
  ACCESS_TOKEN_EXPIRY,
  ACCESS_TOKEN_ISSUER,
  ACCESS_TOKEN_SECRET,
} from 'src/env';
import { Brand } from 'src/types/brand';
import { JwtToken } from 'src/types/jwt-token';
import { NaturalNumber } from 'src/types/numbers';
import { NonEmptyString, UUID } from 'src/types/strings';
import z from 'zod';

export type AccessToken = Brand<JwtToken, 'AccessToken'>;

export namespace AccessToken {
  export type Payload = {
    sub: UUID;
    email: NonEmptyString;
    role?: string;
  };

  export type FullPayload = Payload & {
    iat: number;
    exp: number;
    jti: string;
  };

  export const payloadZod = z.object({
    sub: UUID.zod,
    email: NonEmptyString.zod,
    role: z.string().optional(),
  });

  export const is = (x: string): x is AccessToken => {
    return JwtToken.is(x);
  };

  export const mk = (x: string): AccessToken | undefined => {
    if (!is(x)) return undefined;
    return x;
  };

  export const mkUnsafe = (x: string): AccessToken => {
    const n = mk(x);
    if (n === undefined) throw new Error('Should be a valid JWT token');
    return n;
  };

  export const config: JwtToken.ConfigType = {
    secret: NonEmptyString.mkUnsafe(ACCESS_TOKEN_SECRET),
    ttl: NaturalNumber.mkUnsafe(ACCESS_TOKEN_EXPIRY),
    issuer: NonEmptyString.mkUnsafe(ACCESS_TOKEN_ISSUER),
    audience: NonEmptyString.mkUnsafe(ACCESS_TOKEN_AUDIENCE),
  };

  export const generate = (payload: Payload): AccessToken => {
    return AccessToken.mkUnsafe(JwtToken.sign(payload, config));
  };

  export const verify = (token: AccessToken): Payload => {
    const decoded = JwtToken.verify(token, config.secret);
    return payloadZod.parse(decoded);
  };
}
