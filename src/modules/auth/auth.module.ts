import { forwardRef, Module } from '@nestjs/common';
import { UsersModule } from 'modules/users/users.module';
import { AuthService } from 'modules/auth/services';

@Module({
  imports: [
    forwardRef(() => UsersModule),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
