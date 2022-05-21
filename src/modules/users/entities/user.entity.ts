import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  _id!: ObjectId;

  @Prop()
  login?: string;

  @Prop()
  email?: string;

  @Prop()
  password!: string;

  @Prop({ type: Date, default: Date.now })
  registerDate!: Date;
}

export const UserSchema = SchemaFactory.createForClass<User>(User);
