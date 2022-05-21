import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { User } from 'modules/users/entities';

export type AlbumDocument = Album & Document;

@Schema()
export class Album {
  _id!: ObjectId;

  @Prop({ unique: true })
  metaId!: number;

  @Prop()
  title!: string;

  @Prop({
    ref: () => User,
  })
  owner!: User;
}

export const AlbumSchema = SchemaFactory.createForClass<Album>(Album);
