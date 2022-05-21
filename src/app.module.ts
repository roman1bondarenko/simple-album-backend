import { HttpModule } from '@nestjs/axios';
import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { CommonModule } from '_common/common.module';
import { BaseExceptionFilter } from '_common/filters/base-exception.filter';
import { AppController } from 'app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfigService } from '_common/services/app-config.service';
import { UsersModule } from 'modules/users/users.module';
import { PhotosModule } from 'modules/photos/photos.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CommonModule,
    HttpModule,
    MongooseModule.forRootAsync({
      useFactory: (appConfigService: AppConfigService) => (appConfigService.mongoOptions),
      inject: [AppConfigService],
      imports: [CommonModule],
    }),
    UsersModule,
    PhotosModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: BaseExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ transform: true }),
    },
  ],
  controllers: [AppController],
})
export class AppModule {}
