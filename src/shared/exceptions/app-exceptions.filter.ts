/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { Request } from 'express';
import { ZodValidationException } from 'nestjs-zod';
import {
  AuthenticationError,
  CriticalError,
  DatabaseParseError,
  ForbiddenError,
  NotFoundError,
} from 'src/shared/errors';
import { match } from 'ts-pattern';
import { z } from 'zod';

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AppExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): any {
    if (
      !(
        exception instanceof ForbiddenError ||
        exception instanceof AuthenticationError ||
        exception instanceof NotFoundError
      )
    ) {
      this.logger.error(
        exception,
        exception instanceof Error ? exception.stack : '',
      );
    }

    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const type = host.getType();

    if (exception instanceof DatabaseParseError) {
      //FIXME: we should send this error to our development team.
      this.logger.error(
        exception.message,
        exception.stack,
        'DatabaseParseError',
      );
    }

    return match(type)
      .with('http', () => {
        const response = host.switchToHttp().getResponse();

        if (exception instanceof CriticalError) {
          //FIXME: we should set Loki to send email to admin when this error happens
          this.logger.error(
            exception.message,
            exception.stack,
            'CriticalError',
          );
        }
        if (exception instanceof AuthenticationError) {
          console.log(exception.getStatus(), '>>>>>>>>>>>>>', request.url);
          return response.status(exception.getStatus()).json({
            timestamp: new Date().toISOString(),
            path: request.url,
            message: 'Unauthorized.',
            errors: exception,
          });
        }

        if (exception instanceof ZodValidationException) {
          const err = exception.getResponse();
          return response.status(exception.getStatus()).json({
            timestamp: new Date().toISOString(),
            path: request.url,
            ...(typeof err === 'string' ? { message: err } : err),
          });
        }
        if (exception instanceof z.ZodError) {
          const err = exception.message;
          return response.status(400).json({
            timestamp: new Date().toISOString(),
            path: request.url,
            error: err,
          });
        }

        if (exception instanceof ForbiddenError) {
          return response.status(exception.getStatus()).json({
            timestamp: new Date().toISOString(),
            path: request.url,
            message: 'Forbidden.',
            errors: exception,
          });
        }

        if (exception instanceof NotFoundError) {
          return response.status(exception.getStatus()).json({
            timestamp: new Date().toISOString(),
            path: request.url,
            message: 'Not found.',
            errors: exception,
          });
        }
        return response.status(500).json({
          error: true,
          message: exception,
        });
      })
      .with('ws', () => {
        return 'unknown';
      })
      .with('rpc', () => {
        return 'unknown';
      })
      .exhaustive();
  }
}
