import { forwardRef, Module } from '@nestjs/common';
import { UsersModule } from 'modules/users/users.module';
import { AuthService } from 'modules/auth/services';
import { JwtModule } from '@nestjs/jwt';
import { AppConfigService } from '_common/services/app-config.service';
import { CommonModule } from '_common/common.module';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.registerAsync({
      imports: [CommonModule],
      useFactory: (appConfigService: AppConfigService) => ({
        secret: appConfigService.jwtSecret,
      }),
      inject: [AppConfigService],
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
