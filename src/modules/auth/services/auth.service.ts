import { Injectable } from '@nestjs/common';
import { UserService } from 'modules/users/services';
import { UnauthorizedError } from '_common/errors';
import * as md5 from 'md5';
import { ILoginUserPayload } from '../interfaces';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async login(payload: ILoginUserPayload): Promise<string> {
    const { login, email } = payload;
    const { password } = await this.userService.findByEmailLogin({
      login,
      email,
    }) || {};

    const hashedPassword = this.cryptPassword(payload.password);

    if (password !== hashedPassword) {
      throw new UnauthorizedError('Invalid login or password, please check creds');
    }

    return Promise.resolve('token');
  }

  cryptPassword(password: string): string {
    return md5(password);
  }
}
