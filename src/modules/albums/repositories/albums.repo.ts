import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAlbumDto } from '../dtos';
import { Album, AlbumDocument } from '../entities';

export class AlbumsRepo {
  constructor(
    @InjectModel(Album.name)
    private albumModel: Model<AlbumDocument>,
  ) {}

  create(payload: CreateAlbumDto): Promise<AlbumDocument> {
    return this.albumModel.create(payload);
  }
}
