import { forwardRef, Module } from '@nestjs/common';
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
    forwardRef(() => AlbumsModule),
    AuthModule,
    CommonModule,
    HttpModule,
    UsersModule,
    MongooseModule.forFeature([
      { name: Photo.name, schema: PhotoSchema },
    ]),
  ],
  providers: [PhotosService, PhotosRepo],
  controllers: [PhotosController],
  exports: [PhotosService],
})
export class PhotosModule {}
