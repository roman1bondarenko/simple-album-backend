import {
  Controller, Delete,
  Get,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'modules/auth/guards';
import { JwtPayload } from 'modules/auth/interfaces/jwt-payload';
import { MongoDeletePayloadType } from '_common/types/mongoDeletePayload.type';
import { GetPhotoFilters, QueryPhotoId } from './dtos';
import { Photo } from './entities';
import { PhotosService } from './services';

@Controller()
export class PhotosController {
  constructor(private photosService: PhotosService) {
  }

  @Get('load-photos')
  @UseGuards(JwtAuthGuard)
  loadPhotos(@Req() { user }: Request): Promise<{ message: string }> {
    return this.photosService.loadPhotos(<JwtPayload>user);
  }

  @Get('get-photos')
  getPhotos(@Query() params: GetPhotoFilters): Promise<Photo[]> {
    return this.photosService.getPhotos(params);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete-photo')
  deleteAlbum(
    @Query() { photoid }: QueryPhotoId,
  ): Promise<MongoDeletePayloadType> {
    return this.photosService.deletePhotosByMetaIds(photoid.split(','));
  }
}
