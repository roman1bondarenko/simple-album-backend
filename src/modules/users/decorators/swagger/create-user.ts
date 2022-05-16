import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiCreatedResponse,
  ApiBadGatewayResponse,
  ApiBody,
} from '@nestjs/swagger';
import { CreateUserDto } from 'modules/users/dtos/create-user.dto';
import { UserDto } from 'modules/users/dtos';

export function ApiRouteCreateUserSwaggerDecorator(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Create User' }),
    ApiBody({
      type: CreateUserDto,
    }),
    ApiCreatedResponse({
      description: 'User was created. Returns created User.',
      type: UserDto,
    }),
    ApiBadGatewayResponse({ description: 'Internal Server Error' }),
  );
}
