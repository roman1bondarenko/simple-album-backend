import {
  ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express-serve-static-core';

@Catch()
export class BaseExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse();
    const request: Request = ctx.getRequest();
    const status = exception.getStatus ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    if (request.body) {
      // Here we can set up logging tool
      exception.message = `bodyPayload: ${JSON.stringify(request.body)}, message: ${exception.message}`;
    }

    response.status(status).send(exception.message);
  }
}
