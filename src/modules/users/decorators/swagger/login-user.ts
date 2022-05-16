import { applyDecorators } from '@nestjs/common';
import {
  ApiOperation,
  ApiCreatedResponse,
  ApiBadGatewayResponse,
  ApiBody, ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginUserDto } from '../../dtos';

export function ApiRouteLoginUserSwaggerDecorator(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'Login User' }),
    ApiBody({
      type: LoginUserDto,
    }),
    ApiCreatedResponse({
      description: 'JWT token.',
      type: String,
    }),
    ApiBadGatewayResponse({ description: 'Internal Server Error' }),
    ApiUnauthorizedResponse(),
  );
}
