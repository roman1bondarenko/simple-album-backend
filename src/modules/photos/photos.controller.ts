import {
  Controller,
  Get,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'modules/auth/guards';
import { JwtPayload } from 'modules/auth/interfaces/jwt-payload';
import { GetPhotoFilters } from 'modules/photos/dtos';
import { Photo } from 'modules/photos/entities';
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
}
