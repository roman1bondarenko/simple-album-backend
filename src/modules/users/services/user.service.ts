import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AuthService } from 'modules/auth/services';
import { Nullable } from '_common/types/nullable';
import { UserFindOptions } from 'modules/users/interfaces';
import { UserDocument } from '../entities';
import { CreateUserDto } from '../dtos';
import { UserRepo } from '../repositories';

@Injectable()
export class UserService {
  constructor(
    private userRepo: UserRepo,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  createUser(payload: CreateUserDto): Promise<UserDocument> {
    const hashedPassword = this.authService.cryptPassword(payload.password);

    return this.userRepo.create({
      ...payload,
      password: hashedPassword,
    });
  }

  findByEmailLogin(payload: UserFindOptions): Promise<Nullable<UserDocument>> {
    return this.userRepo.findOne(payload);
  }

  getById(id: string): Promise<Nullable<UserDocument>> {
    return this.userRepo.findById(id);
  }
}
