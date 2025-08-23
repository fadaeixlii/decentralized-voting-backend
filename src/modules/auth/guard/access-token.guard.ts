import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AccessToken } from '../entities/access-token';
import { Request } from 'express';

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
      AccessToken.verify(accessToken);
      return true;
    } catch {
      throw new UnauthorizedException('Invalid/Expired token');
    }
  }
}
