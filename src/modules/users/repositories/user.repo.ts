import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../entities';

export class UserRepo {
  constructor(
    @InjectModel(User.name)
    private appModel: Model<UserDocument>,
  ) {}
}
