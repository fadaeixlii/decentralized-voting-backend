import { SetMetadata, applyDecorators, CustomDecorator } from '@nestjs/common';
import { AuthOptions, AuthType } from '../types/auth.type';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export const AUTH_OPTIONS_KEY = 'auth:options';

export const Auth = (options: AuthOptions = { type: AuthType.ADMIN_USER }) => {
  const decorators: Array<
    ClassDecorator | MethodDecorator | CustomDecorator<string>
  > = [SetMetadata(AUTH_OPTIONS_KEY, options)];

  if (options.type === AuthType.ADMIN_USER) {
    decorators.push(
      ApiBearerAuth('access-token'),
      ApiUnauthorizedResponse({ description: 'Invalid or missing JWT' }),
    );
  }

  if (options.type === AuthType.ADMIN_USER) {
    decorators.push(ApiForbiddenResponse({ description: 'Admins only' }));
  }

  return applyDecorators(...decorators);
};

export const Public = () => Auth({ type: AuthType.PUBLIC });

export const AdminUser = () => Auth({ type: AuthType.ADMIN_USER });
