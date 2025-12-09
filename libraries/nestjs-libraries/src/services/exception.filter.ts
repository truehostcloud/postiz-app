import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { removeAuth } from '@gitroom/backend/services/auth/auth.middleware';

export class HttpForbiddenException extends HttpException {
  constructor() {
    super('Forbidden', 403);
  }
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let apm: any = null;
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      apm = require('elastic-apm-node');
    } catch (e) {
      apm = null;
    }

    let status = 500;
    if (exception instanceof HttpException) {
      try {
        status = exception.getStatus();
      } catch (e) {
        status = 500;
      }
    }

    if (exception instanceof HttpForbiddenException) {
      removeAuth(response);
      return response.status(401).send();
    }

    // Capture handled server errors (500-level) and optionally 4xx if desired
    try {
      if (apm && typeof apm.captureError === 'function') {
        const ctxInfo: any = {
          url: request?.originalUrl || request?.url,
          method: request?.method,
          headers: request?.headers,
        };

        if (exception instanceof Error) {
          apm.captureError(exception, { custom: { http: ctxInfo, status } });
        } else {
          apm.captureError(new Error(JSON.stringify(exception)), { custom: { http: ctxInfo, status } });
        }
      }
    } catch (e) {
      // ignore any issues with the APM capture
    }

    if (exception instanceof HttpException) {
      const message = (exception as any).message || 'error';
      return response.status(status).json({ message });
    }

    return response.status(500).json({ message: 'Internal server error' });
  }
}
