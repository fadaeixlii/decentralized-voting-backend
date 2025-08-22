import { AuthenticationError } from 'src/shared/errors';
import { Brand } from './brand';
import { NaturalNumber } from './numbers';
import { NonEmptyString } from './strings';
import * as JWT from 'jsonwebtoken';

export type JwtToken = Brand<NonEmptyString, 'JwtToken'>;

export namespace JwtToken {
  export const jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/;

  export function is(x: string): x is JwtToken {
    return jwtRegex.test(x.trim());
  }

  export const zod = NonEmptyString.zod.refine(is, {
    message: 'Should be a valid JWT token',
  });

  export const mk = (x: string): JwtToken | undefined =>
    is(x) ? x : undefined;
  export const mkUnsafe = (x: string): JwtToken => {
    const n = mk(x);
    if (n === undefined) throw new Error('Should be a valid JWT token');
    return n;
  };

  export type ConfigType = {
    secret: NonEmptyString;
    ttl: NaturalNumber;
    algorithm?: JWT.Algorithm;
    issuer: NonEmptyString;
    audience: NonEmptyString;
  };

  export const sign = (
    payload: Record<string, unknown> & { sub: string },
    config: JwtToken.ConfigType,
  ): JwtToken => {
    const options: JWT.SignOptions = {
      expiresIn: config.ttl,
      issuer: config.issuer,
      audience: config.audience,
      algorithm: config.algorithm ?? 'HS256',
    };
    const token = JWT.sign(payload, config.secret, options);

    if (!is(token)) {
      throw new Error('Generated JWT token is invalid');
    }

    return token;
  };

  export const verify = (
    token: JwtToken,
    secret: NonEmptyString,
  ): JWT.JwtPayload => {
    try {
      const decoded: JWT.JwtPayload = JWT.verify(
        token.toString(),
        secret,
      ) as JWT.JwtPayload;

      return decoded;
    } catch (error: unknown) {
      // Handle JWT verification errors with proper 401 responses
      if (error instanceof JWT.TokenExpiredError) {
        throw AuthenticationError.mk('User', error as Error);
      } else if (error instanceof JWT.JsonWebTokenError) {
        throw AuthenticationError.mk('User', error as Error);
      } else {
        // Re-throw other errors
        throw error;
      }
    }
  };
}
