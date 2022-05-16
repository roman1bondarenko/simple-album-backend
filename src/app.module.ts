import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { CommonModule } from '_common/common.module';
import { BaseExceptionFilter } from '_common/filters/base-exception.filter';
import { AppController } from 'app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfigService } from '_common/services/app-config.service';

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
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: BaseExceptionFilter,
    },
  ],
  controllers: [AppController],
})
export class AppModule {}
