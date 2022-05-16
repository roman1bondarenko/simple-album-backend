import { Injectable } from '@nestjs/common';
import { UserRepo } from '../repositories';

@Injectable()
export class UserService {
  constructor(private userRepo: UserRepo) {}
}
