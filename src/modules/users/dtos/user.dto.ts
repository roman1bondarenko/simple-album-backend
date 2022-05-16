import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  login?: string;

  @ApiProperty()
  email?: string;

  @ApiProperty()
  password!: string;

  @ApiProperty()
  registerDate!: Date;
}
