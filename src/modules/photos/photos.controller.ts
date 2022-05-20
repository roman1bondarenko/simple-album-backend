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

  @Get('load-photos')
  @UseGuards(JwtAuthGuard)
  loadPhotos(@Req() { user }: Request): Promise<{ message: string }> {
    return this.photosService.loadPhotos(<JwtPayload>user);
  }
}
