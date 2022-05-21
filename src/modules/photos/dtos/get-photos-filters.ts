import {
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  Max,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class GetPhotoFilters {
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty()
  ownerid!: string;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  page = 0;

  @IsInt()
  @Type(() => Number)
  @IsOptional()
  @ApiProperty()
  @Max(100)
  maxcount = 100;
}
