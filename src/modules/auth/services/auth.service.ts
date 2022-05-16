import { Injectable } from '@nestjs/common';
import { UserService } from 'modules/users/services';
import { UnauthorizedError } from '_common/errors';
import * as md5 from 'md5';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'modules/users/dtos';
import { Nullable } from '_common/types/nullable';
import { ILoginUserPayload } from '../interfaces';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(payload: ILoginUserPayload): Promise<string> {
    const validatedUser = await this.validateUser(payload);

    if (!validatedUser) {
      throw new UnauthorizedError('Invalid login or password, please check creds');
    }

    return this.jwtService.sign({ userId: validatedUser.id });
  }

  async validateUser(payload: ILoginUserPayload): Promise<Nullable<UserDto>> {
    const hashedPassword = this.cryptPassword(payload.password);

    const user = await this.userService.findByEmailLogin({
      login: payload.login,
      email: payload.email,
    });
    if (user && user.password === hashedPassword) {
      const {
        id, login, email, registerDate,
      } = user;

      return {
        id, login, email, registerDate,
      };
    }

    return null;
  }

  cryptPassword(password: string): string {
    return md5(password);
  }
}
