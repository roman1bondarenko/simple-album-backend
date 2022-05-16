import { Module } from '@nestjs/common';
import { AuthModule } from 'modules/auth/auth.module';
import { CommonModule } from '_common/common.module';
import { HttpModule } from '@nestjs/axios';
import { PhotosService } from './services';
import { PhotosController } from './photos.controller';

@Module({
  imports: [AuthModule, CommonModule, HttpModule],
  providers: [PhotosService],
  controllers: [PhotosController],
})
export class PhotosModule {}
