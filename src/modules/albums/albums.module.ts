import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'modules/users/users.module';
import { PhotosModule } from 'modules/photos/photos.module';
import { Album, AlbumSchema } from './entities';
import { AlbumsRepo } from './repositories';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';

@Module({
  imports: [
    forwardRef(() => PhotosModule),
    MongooseModule.forFeature([
      { name: Album.name, schema: AlbumSchema },
    ]),
    UsersModule,
  ],
  providers: [
    AlbumsService,
    AlbumsRepo,
  ],
  controllers: [AlbumsController],
  exports: [AlbumsService],
})
export class AlbumsModule {}
