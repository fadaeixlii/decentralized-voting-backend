import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AccessToken } from '../entities/access-token';
import { Request } from 'express';
import { AuthOptions } from '../types/auth.type';
import { AUTH_OPTIONS_KEY, IS_PUBLIC_KEY } from '../decorators/auth.decorator';
import { AuthType } from '../types/auth.type';
import { Reflector } from '@nestjs/core';

export const USER_KEY = 'user';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const handler = context.getHandler();
    const cls = context.getClass();

    // Check if endpoint is marked as public
    const isPublic = this.reflector.get<boolean>(IS_PUBLIC_KEY, handler);
    if (isPublic) {
      return true;
    }

    const options: AuthOptions = this.reflector.get<AuthOptions>(
      AUTH_OPTIONS_KEY,
      handler,
    ) ??
      this.reflector.get<AuthOptions>(AUTH_OPTIONS_KEY, cls) ?? {
        type: AuthType.ADMIN_USER,
      };
    const safeOptions = AuthOptions.zod.parse(options);
    if (safeOptions.type === AuthType.PUBLIC) {
      return true;
    }

    const req = context.switchToHttp().getRequest<Request>();
    const auth = req.headers.authorization;
    if (!auth) {
      throw new UnauthorizedException('Authorization header missing');
    }
    const accessToken = AccessToken.mkUnsafe(auth.split(' ')[1]);
    if (!accessToken) {
      throw new UnauthorizedException('Token missing');
    }
    try {
      const payload = AccessToken.verify(accessToken);
      req[USER_KEY] = payload;

      if (options.type === AuthType.ADMIN_USER) {
        if (!options.roles?.some((role) => payload.role?.includes(role))) {
          throw new ForbiddenException(
            `Requires role: ${options.roles?.join(', ')}`,
          );
        }
      }

      return true;
    } catch {
      throw new UnauthorizedException('Invalid/Expired token');
    }
  }
}
