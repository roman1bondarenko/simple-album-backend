import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class UpdateTitleDto {
  @IsMongoId()
  albumid!: string;

  @IsString()
  @IsNotEmpty()
  new_album_name!: string;
}
