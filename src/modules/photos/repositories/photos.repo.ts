import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoDeletePayloadType } from '_common/types/mongoDeletePayload.type';
import { Photo, PhotoDocument } from '../entities';
import { PhotoFilters } from '../interfaces';

export class PhotosRepo {
  constructor(
    @InjectModel(Photo.name)
    private photoModel: Model<PhotoDocument>,
  ) {}

  createMany(bulkPhotos: Photo[]): Promise<PhotoDocument[]> {
    return this.photoModel.insertMany(bulkPhotos);
  }

  findMany({ user, maxcount, page }: PhotoFilters): Promise<PhotoDocument[]> {
    const skip = +maxcount * (+page);
    return this.photoModel.find({ user }).limit(+maxcount).skip(skip).exec();
  }

  deletePhotosByAlbumsMetaIds(
    ownerId: string,
    metaAlbumsIds: string[],
  ): Promise<MongoDeletePayloadType> {
    return this.photoModel.deleteMany({
      metaAlbumId: {
        $in: metaAlbumsIds,
      },
      'owner._id': ownerId,
    }).exec();
  }

  deletePhotosByMetaIds(metaIds: string[]): Promise<MongoDeletePayloadType> {
    return this.photoModel.deleteMany({
      metaId: { $in: metaIds },
    }).exec();
  }
}
