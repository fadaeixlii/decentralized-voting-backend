import { ZodError } from 'zod';

export class DatabaseParseError extends Error {
  constructor(public error: ZodError) {
    super('Database Parse Error');
  }
}
