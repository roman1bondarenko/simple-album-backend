import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from 'modules/users/entities';

export type AlbumDocument = Album & Document;

@Schema()
export class Album {
  @Prop({ unique: true })
  metaId!: number;

  @Prop()
  title!: string;

  @Prop({
    ref: User,
  })
  owner!: User;
}

export const UserSchema = SchemaFactory.createForClass<Album>(Album);
