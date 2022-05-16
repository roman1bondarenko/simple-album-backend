import { HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';

export class UnauthorizedError extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}
