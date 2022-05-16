import { Injectable } from '@nestjs/common';
import * as md5 from 'md5';
import { UserDocument } from '../entities';
import { CreateUserDto } from '../dtos';
import { UserRepo } from '../repositories';

@Injectable()
export class UserService {
  constructor(private userRepo: UserRepo) {}

  createUser(payload: CreateUserDto): Promise<UserDocument> {
    const hashedPassword = md5(payload.password);

    return this.userRepo.create({
      ...payload,
      password: hashedPassword,
    });
  }
}
