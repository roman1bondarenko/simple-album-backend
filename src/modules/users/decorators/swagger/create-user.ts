import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiCreatedResponse,
  ApiBadGatewayResponse,
  ApiBody,
} from '@nestjs/swagger';
import { CreateUserDto } from '../../dtos';

export function ApiRouteCreateUserSwaggerDecorator(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Create User' }),
    ApiBody({
      type: CreateUserDto,
    }),
    ApiCreatedResponse({
      description: 'User was created. Returns created user ID.',
      type: String,
    }),
    ApiBadGatewayResponse({ description: 'Internal Server Error' }),
  );
}
