import { Logger, UnauthorizedException } from '@nestjs/common';

type Resource = 'User' | 'RefreshToken';

export class AuthenticationError extends UnauthorizedException {
  private readonly logger = new Logger(AuthenticationError.name);
  readonly _tag = 'AuthenticationError';

  private readonly dictionary: Record<Resource, string> = {
    User: 'Invalid Access Token.',
    RefreshToken: 'This refreshToken does not belong to you.',
  };

  private constructor(
    private readonly resource: Resource,
    private readonly e?: Error,
  ) {
    super({
      message: resource,
      error: 'Unauthorized',
      statusCode: 401,
    });

    if (e) {
      this.logger.error(`${this.resource}: ${e.message}`, e.stack);
    } else {
      this.logger.error(`${this.resource}: Authentication failed`);
    }
  }

  static mk(resource: Resource, e?: Error): AuthenticationError {
    return new AuthenticationError(resource, e);
  }

  toString(): string {
    return this.resource;
  }
}
