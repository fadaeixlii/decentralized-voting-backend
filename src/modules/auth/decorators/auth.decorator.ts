import { SetMetadata, applyDecorators, CustomDecorator } from '@nestjs/common';
import { AuthOptions, AuthType } from '../types/auth.type';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiSecurity,
  ApiUnauthorizedResponse,
  ApiOperation,
} from '@nestjs/swagger';

export const AUTH_OPTIONS_KEY = 'auth:options';
export const IS_PUBLIC_KEY = 'isPublic';

export const Auth = (options: AuthOptions = { type: AuthType.ADMIN_USER }) => {
  const decorators: Array<
    ClassDecorator | MethodDecorator | CustomDecorator<string>
  > = [SetMetadata(AUTH_OPTIONS_KEY, options)];

  if (options.type === AuthType.ADMIN_USER) {
    decorators.push(
      ApiBearerAuth('access-token'),
      ApiSecurity('session-id'),
      ApiUnauthorizedResponse({ description: 'Invalid or missing JWT' }),
      ApiForbiddenResponse({ description: 'Admins only' }),
    );
  }

  return applyDecorators(...decorators);
};

export const Public = () => {
  return applyDecorators(
    SetMetadata(IS_PUBLIC_KEY, true),
    SetMetadata(AUTH_OPTIONS_KEY, { type: AuthType.PUBLIC }),
    ApiOperation({ security: [] }),
  );
};

export const AdminUser = () => Auth({ type: AuthType.ADMIN_USER });
