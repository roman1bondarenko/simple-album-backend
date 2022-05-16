import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dtos';
import { User, UserDocument } from '../entities';

export class UserRepo {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  create(payload: CreateUserDto): Promise<UserDocument> {
    return this.userModel.create(payload);
  }
}
