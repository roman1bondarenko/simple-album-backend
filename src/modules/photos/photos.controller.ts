import {
  Controller, Get, Req, UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'modules/auth/guards';
import { JwtPayload } from 'modules/auth/interfaces/jwt-payload';
import { PhotosService } from './services';

@Controller()
export class PhotosController {
  constructor(private photosService: PhotosService) {
  }

  @Get('photos')
  @UseGuards(JwtAuthGuard)
  loadPhotos(@Req() { user }: Request): Promise<unknown> {
    return this.photosService.loadPhotos(<JwtPayload>user);
  }
}
