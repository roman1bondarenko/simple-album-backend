import { Injectable } from '@nestjs/common';
import { JwtPayload } from 'modules/auth/interfaces/jwt-payload';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { UserService } from 'modules/users/services';
import { Album } from 'modules/albums/entities';
import { AlbumsService } from 'modules/albums/albums.service';
import { User } from 'modules/users/entities';
import { Photo } from '../entities';
import { JsonPlaceholderPhoto } from '../interfaces';
import { PhotosRepo } from '../repositories';

@Injectable()
export class PhotosService {
  private static JSON_PLACE_HOLDER_URL = 'http://jsonplaceholder.typicode.com/photos';

  constructor(
    private httpService: HttpService,
    private userService: UserService,
    private albumService: AlbumsService,
    private photoRepo: PhotosRepo,
  ) {
  }

  async loadPhotos({ userId }: JwtPayload): Promise<{ message: string }> {
    const user = await this.userService.getById(userId) as User;

    const { data: photos } = await firstValueFrom(
      this.httpService.get<JsonPlaceholderPhoto[]>(
        PhotosService.JSON_PLACE_HOLDER_URL,
      ),
    );

    const createdAlbums: { [key: number]: Album } = {};

    const photosBulk = [];

    for (let i = 0; i < photos.length; i++) {
      const photo = photos[i];
      if (!createdAlbums[photo.albumId]) {
        const album = await this.albumService.createAlbum({
          title: photo.title,
          owner: user,
          metaId: photo.albumId,
        });

        createdAlbums[album.metaId] = album;
      }

      const album = createdAlbums[photo.albumId];

      const photoDto: Photo = {
        metaId: photo.id,
        metaAlbumId: photo.albumId,
        album,
        title: photo.title,
        url: photo.url,
        thumbnailUrl: photo.thumbnailUrl,
      };

      photosBulk.push(photoDto);
    }

    await this.photoRepo.createMany(photosBulk);

    return { message: 'ok' };
  }
}
