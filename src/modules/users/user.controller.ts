import {
  Body,
  Controller,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from 'modules/auth/services/auth.service';
import {
  ApiRouteCreateUserSwaggerDecorator, ApiRouteLoginUserSwaggerDecorator,
} from './decorators';
import { UserService } from './services';
import {
  CreateUserDto,
  LoginUserDto,
} from './dtos';

@ApiTags('Users')
@Controller()
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('login')
  @ApiRouteLoginUserSwaggerDecorator()
  login(
    @Body(ValidationPipe) payload: LoginUserDto,
  ): Promise<string> {
    return this.authService.login(payload);
  }

  @Post('register')
  @ApiRouteCreateUserSwaggerDecorator()
  async createUser(
    @Body(ValidationPipe) payload: CreateUserDto,
  ): Promise<string> {
    const user = await this.userService.createUser(payload);

    return user.id as string;
  }
}
