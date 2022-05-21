import {
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class QueryPhotoId {
  @IsNotEmpty()
  @ApiProperty()
  photoid!: string;
}
