import { NonEmptyString } from './../types/strings/none-empty-string';
import * as dotenv from 'dotenv-flow';
import { NaturalNumber } from 'src/types/numbers';
import z from 'zod';
dotenv.config();

export const PORT = NaturalNumber.zod.parse(process.env.PORT);

// postgres
export const POSTGRES_HOST: string = NonEmptyString.zod.parse(
  process.env.POSTGRES_HOST,
);
export const POSTGRES_PORT = NaturalNumber.zod.parse(process.env.POSTGRES_PORT);
export const POSTGRES_USER: string = NonEmptyString.zod.parse(
  process.env.POSTGRES_USER,
);
export const POSTGRES_PASSWORD: string = NonEmptyString.zod.parse(
  process.env.POSTGRES_PASSWORD,
);
export const POSTGRES_DATABASE: string = NonEmptyString.zod.parse(
  process.env.POSTGRES_DATABASE,
);
export const POSTGRES_LOGGING: boolean = z
  .boolean()
  .parse(process.env.POSTGRES_LOGGING === 'true' || false);
export const POSTGRES_SYNCHRONIZE: boolean = z
  .boolean()
  .parse(process.env.POSTGRES_SYNCHRONIZE === 'true' || false);
export const POSTGRES_DROP_SCHEMA: boolean = z
  .boolean()
  .parse(process.env.POSTGRES_DROP_SCHEMA === 'true' || false);

// access token
export const ACCESS_TOKEN_EXPIRY = NaturalNumber.zod.parse(
  process.env.ACCESS_TOKEN_EXPIRY,
);
export const ACCESS_TOKEN_ISSUER = NonEmptyString.zod.parse(
  process.env.ACCESS_TOKEN_ISSUER,
);
export const ACCESS_TOKEN_AUDIENCE = NonEmptyString.zod.parse(
  process.env.ACCESS_TOKEN_AUDIENCE,
);
export const ACCESS_TOKEN_SECRET = NonEmptyString.zod.parse(
  process.env.ACCESS_TOKEN_SECRET,
);

// refresh token
export const REFRESH_TOKEN_EXPIRY = NaturalNumber.zod.parse(
  process.env.REFRESH_TOKEN_EXPIRY,
);
export const REFRESH_TOKEN_ISSUER = NonEmptyString.zod.parse(
  process.env.REFRESH_TOKEN_ISSUER,
);
export const REFRESH_TOKEN_AUDIENCE = NonEmptyString.zod.parse(
  process.env.REFRESH_TOKEN_AUDIENCE,
);
export const REFRESH_TOKEN_SECRET = NonEmptyString.zod.parse(
  process.env.REFRESH_TOKEN_SECRET,
);
