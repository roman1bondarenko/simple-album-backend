import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Album } from 'modules/albums/entities';

export type PhotoDocument = Photo & Document;

@Schema()
export class Photo {
  @Prop({ unique: true })
  metaId!: number;

  @Prop()
  metaAlbumId!: number;

  @Prop({
    ref: Album,
  })
  album!: Album;

  @Prop()
  title!: string;

  @Prop()
  url!: string;

  @Prop()
  thumbnailUrl!: string;
}

export const UserSchema = SchemaFactory.createForClass<Photo>(Photo);