import { SetMetadata } from '@nestjs/common';
import { AuthOptions, AuthType } from '../types/auth.type';

export const AUTH_OPTIONS_KEY = 'auth:options';

export const Auth = (options: AuthOptions = { type: AuthType.ADMIN_USER }) =>
  SetMetadata(AUTH_OPTIONS_KEY, options);

export const Public = () => Auth({ type: AuthType.PUBLIC });

export const AdminUser = () => Auth({ type: AuthType.ADMIN_USER });
