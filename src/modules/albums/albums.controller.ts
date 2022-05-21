import {
  Body,
  Controller,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AlbumsService } from 'modules/albums/albums.service';
import { JwtAuthGuard } from 'modules/auth/guards';
import { Request } from 'express';
import { JwtPayload } from 'modules/auth/interfaces/jwt-payload';
import { Album } from 'modules/albums/entities';
import { Nullable } from '_common/types/nullable';
import { UpdateTitleDto } from './dtos';

@Controller('')
export class AlbumsController {
  constructor(private albumService: AlbumsService) {}

  @Patch('change-album-title')
  @UseGuards(JwtAuthGuard)
  updateTitle(
    @Body() payload: UpdateTitleDto,
    @Req() { user }: Request,
  ): Promise<Nullable<Album>> {
    return this.albumService.updateAlbumTitle(<JwtPayload>user, payload);
  }
}
