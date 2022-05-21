import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class QueryAlbumId {
  @IsNotEmpty()
  @ApiProperty()
  albumid!: string;
}
