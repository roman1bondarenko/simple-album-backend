import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'modules/users/users.module';
import { Album, AlbumSchema } from './entities';
import { AlbumsRepo } from './repositories';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';

@Module({
  imports: [
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
