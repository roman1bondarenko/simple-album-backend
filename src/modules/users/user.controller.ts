import {
  Body,
  Controller,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiRouteCreateUserSwaggerDecorator,
} from './decorators';
import { UserService } from './services';
import {
  CreateUserDto,
} from './dtos';

@ApiTags('Users')
@Controller()
export class UserController {
  constructor(
    private appService: UserService,
  ) {}

  @Post()
  @ApiRouteCreateUserSwaggerDecorator()
  createUser(
    @Body(ValidationPipe) payload: CreateUserDto,
  ): Promise<unknown> {
    return Promise.resolve(payload);
  }
}
