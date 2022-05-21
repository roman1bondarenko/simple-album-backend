import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Nullable } from '_common/types/nullable';
import { User } from 'modules/users/entities';
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

  getById(id: string): Promise<Nullable<AlbumDocument>> {
    return this.albumModel.findById(id).exec();
  }

  getManyByIds(metaIds: string[]): Promise<AlbumDocument[]> {
    return this.albumModel.find({ metaId: { $in: metaIds } }).exec();
  }

  updateTitle(id: string, newTitle: string): Promise<Nullable<Album>> {
    return this.albumModel.findByIdAndUpdate(id, { title: newTitle }).exec();
  }

  deleteAlbum(user: Nullable<User>, metaIds: string[]): Promise<unknown> {
    return this.albumModel.deleteMany({ user, metaId: { $in: metaIds } }).exec();
  }
}
