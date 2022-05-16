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
    private userService: UserService,
  ) {}

  @Post('register')
  @ApiRouteCreateUserSwaggerDecorator()
  async createUser(
    @Body(ValidationPipe) payload: CreateUserDto,
  ): Promise<string> {
    const user = await this.userService.createUser(payload);

    return user.id as string;
  }
}
