import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from 'modules/users/user.controller';
import { AuthModule } from 'modules/auth/auth.module';
import { User, UserSchema } from './entities';
import { UserRepo } from './repositories';
import { UserService } from './services';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [UserService, UserRepo],
  controllers: [UserController],
  exports: [UserService],
})
export class UsersModule {}
