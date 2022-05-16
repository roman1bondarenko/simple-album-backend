import { forwardRef, Module } from '@nestjs/common';
import { UsersModule } from 'modules/users/users.module';
import { AuthService } from 'modules/auth/services';
import { JwtModule } from '@nestjs/jwt';
import { AppConfigService } from '_common/services/app-config.service';
import { CommonModule } from '_common/common.module';
import { JwtStrategy } from './strategies';

@Module({
  imports: [
    CommonModule,
    forwardRef(() => UsersModule),
    JwtModule.registerAsync({
      imports: [CommonModule],
      useFactory: (appConfigService: AppConfigService) => ({
        secret: appConfigService.jwtSecret,
      }),
      inject: [AppConfigService],
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtStrategy],
})
export class AuthModule {}
