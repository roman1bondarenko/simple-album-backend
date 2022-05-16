import { Injectable } from '@nestjs/common';
import { UserService } from 'modules/users/services';
import { UnauthorizedError } from '_common/errors';
import * as md5 from 'md5';
import { JwtService } from '@nestjs/jwt';
import { ILoginUserPayload } from '../interfaces';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(payload: ILoginUserPayload): Promise<string> {
    const { login, email } = payload;
    const { password, id } = await this.userService.findByEmailLogin({
      login,
      email,
    }) || {};

    const hashedPassword = this.cryptPassword(payload.password);

    if (password !== hashedPassword) {
      throw new UnauthorizedError('Invalid login or password, please check creds');
    }

    return this.jwtService.sign({ userId: id });
  }

  cryptPassword(password: string): string {
    return md5(password);
  }
}
