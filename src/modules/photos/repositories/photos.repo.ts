import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Photo, PhotoDocument } from '../entities';

export class PhotosRepo {
  constructor(
    @InjectModel(Photo.name)
    private photoModel: Model<PhotoDocument>,
  ) {}

  createMany(bulkPhotos: Photo[]): Promise<PhotoDocument[]> {
    return this.photoModel.insertMany(bulkPhotos);
  }
}
