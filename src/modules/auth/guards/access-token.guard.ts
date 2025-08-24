import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AccessToken } from '../entities/access-token';
import { Request } from 'express';

export const USER_KEY = 'user';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const auth = req.headers.authorization;
    const accessToken = AccessToken.mkUnsafe(auth?.split(' ')[1] as string);
    if (!accessToken) {
      throw new UnauthorizedException('Token missing');
    }
    try {
      const payload = AccessToken.verify(accessToken);
      req[USER_KEY] = payload;
      return true;
    } catch {
      throw new UnauthorizedException('Invalid/Expired token');
    }
  }
}
