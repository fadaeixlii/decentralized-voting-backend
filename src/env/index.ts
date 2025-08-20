import * as dotenv from 'dotenv-flow';
import z from 'zod';
dotenv.config();

// postgres
export const POSTGRES_HOST: string = z
  .string()
  .parse(process.env.POSTGRES_HOST);
export const POSTGRES_PORT = z
  .number()
  .default(5432)
  .parse(
    process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT, 10) : 5432,
  );
export const POSTGRES_USER: string = z
  .string()
  .parse(process.env.POSTGRES_USER);
export const POSTGRES_PASSWORD: string = z
  .string()
  .parse(process.env.POSTGRES_PASSWORD);
export const POSTGRES_DATABASE: string = z
  .string()
  .parse(process.env.POSTGRES_DATABASE);
export const POSTGRES_LOGGING: boolean = z
  .boolean()
  .parse(process.env.POSTGRES_LOGGING === 'true' || false);
export const POSTGRES_SYNCHRONIZE: boolean = z
  .boolean()
  .parse(process.env.POSTGRES_SYNCHRONIZE === 'true' || false);
export const POSTGRES_DROP_SCHEMA: boolean = z
  .boolean()
  .parse(process.env.POSTGRES_DROP_SCHEMA === 'true' || false);

export const PORT = z
  .number()
  .parse(process.env.PORT ? parseInt(process.env.PORT, 10) : undefined);
