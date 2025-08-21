import { AuthenticationError } from 'src/shared/errors';
import { Brand } from './brand';
import { NaturalNumber } from './numbers';
import { NonEmptyString } from './strings';
import * as JWT from 'jsonwebtoken';

export type JWtToken = Brand<NonEmptyString, 'JWtToken'>;

export namespace JwtToken {
  export const jwtRegex = /^[a-zA-Z0-9-._~+/=]{64,256}$/;

  export function is(x: string): x is JWtToken {
    return jwtRegex.test(x.trim());
  }

  export const zod = NonEmptyString.zod.refine(is, {
    message: 'Should be a valid JWT token',
  });

  export const mk = (x: string): JWtToken | undefined =>
    is(x) ? x : undefined;
  export const mkUnsafe = (x: string): JWtToken => {
    const n = mk(x);
    if (n === undefined) throw new Error('Should be a valid JWT token');
    return n;
  };

  export const sign = (
    payload: Record<string, unknown> & { sub: string },
    config: {
      secret: NonEmptyString;
      ttl: NaturalNumber;
      algorithm?: JWT.Algorithm;
      issuer: NonEmptyString;
      audience: NonEmptyString;
    },
  ): JWtToken => {
    const options: JWT.SignOptions = {
      expiresIn: config.ttl,
      issuer: config.issuer,
      subject: payload.sub,
      audience: config.audience,
      algorithm: config.algorithm,
    };
    const token = JWT.sign(payload, config.secret, options);

    if (!is(token)) {
      throw new Error('Generated JWT token is invalid');
    }

    return token;
  };

  export const verify = (
    token: JWtToken,
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
