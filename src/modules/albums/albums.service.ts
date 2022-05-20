import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dtos';
import { AlbumDocument } from './entities';
import { AlbumsRepo } from './repositories';

@Injectable()
export class AlbumsService {
  constructor(private albumsRepo: AlbumsRepo) {
  }

  createAlbum(payload: CreateAlbumDto): Promise<AlbumDocument> {
    return this.albumsRepo.create(payload);
  }
}
