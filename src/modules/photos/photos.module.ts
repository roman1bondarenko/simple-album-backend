import { Module } from '@nestjs/common';
import { AuthModule } from 'modules/auth/auth.module';
import { CommonModule } from '_common/common.module';
import { HttpModule } from '@nestjs/axios';
import { UsersModule } from 'modules/users/users.module';
import { AlbumsModule } from 'modules/albums/albums.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Photo, PhotoSchema } from './entities';
import { PhotosRepo } from './repositories';
import { PhotosService } from './services';
import { PhotosController } from './photos.controller';

@Module({
  imports: [
    AuthModule,
    CommonModule,
    HttpModule,
    UsersModule,
    AlbumsModule,
    MongooseModule.forFeature([
      { name: Photo.name, schema: PhotoSchema },
    ]),
  ],
  providers: [PhotosService, PhotosRepo],
  controllers: [PhotosController],
})
export class PhotosModule {}
