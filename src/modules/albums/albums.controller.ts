import {
  Body,
  Controller, Delete,
  Patch, Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AlbumsService } from 'modules/albums/albums.service';
import { JwtAuthGuard } from 'modules/auth/guards';
import { Request } from 'express';
import { JwtPayload } from 'modules/auth/interfaces/jwt-payload';
import { Album } from 'modules/albums/entities';
import { Nullable } from '_common/types/nullable';
import { QueryAlbumId, UpdateTitleDto } from './dtos';

@Controller('')
export class AlbumsController {
  constructor(private albumService: AlbumsService) {}

  @UseGuards(JwtAuthGuard)
  @Patch('change-album-title')
  updateTitle(
    @Body() payload: UpdateTitleDto,
    @Req() { user }: Request,
  ): Promise<Nullable<Album>> {
    return this.albumService.updateAlbumTitle(<JwtPayload>user, payload);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete-album')
  deleteAlbum(
    @Req() { user }: Request,
    @Query() { albumid }: QueryAlbumId,
  ): Promise<unknown> {
    return this.albumService.deleteAlbums(<JwtPayload>user, albumid.split(','));
  }
}
