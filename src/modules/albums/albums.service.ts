import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtPayload } from 'modules/auth/interfaces/jwt-payload';
import { UserService } from 'modules/users/services';
import { Nullable } from '_common/types/nullable';
import { CreateAlbumDto, UpdateTitleDto } from './dtos';
import { Album, AlbumDocument } from './entities';
import { AlbumsRepo } from './repositories';

@Injectable()
export class AlbumsService {
  constructor(
    private albumsRepo: AlbumsRepo,
    private userService: UserService,
  ) {
  }

  createAlbum(payload: CreateAlbumDto): Promise<AlbumDocument> {
    return this.albumsRepo.create(payload);
  }

  async updateAlbumTitle(
    { userId }: JwtPayload,
    payload: UpdateTitleDto,
  ): Promise<Nullable<Album>> {
    const [user, albumToUpdate] = await Promise.all([
      this.userService.getById(userId),
      this.albumsRepo.getById(payload.albumid),
    ]);

    if (!albumToUpdate) {
      throw new NotFoundException('Album not found');
    }

    if (user?._id.toString() !== albumToUpdate.owner._id?.toString()) {
      throw new ForbiddenException('You have no access to update this album');
    }

    return this.albumsRepo.updateTitle(albumToUpdate.id, payload.new_album_name);
  }
}
