import { HttpStatus } from '@nestjs/common';

export class ApiResponse<T> {
  status!: HttpStatus;

  data?: T;

  error?: Error;
}
