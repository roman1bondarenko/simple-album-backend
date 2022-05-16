import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserFindOptions } from 'modules/users/interfaces';
import { Nullable } from '_common/types/nullable';
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

  findOne(filterOptions: UserFindOptions): Promise<Nullable<UserDocument>> {
    return this.userModel.findOne(filterOptions).exec();
  }
}
