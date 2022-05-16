import {
  IsNotEmpty, IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  login?: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  email?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password!: string;
}
