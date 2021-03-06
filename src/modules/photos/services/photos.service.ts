import {
  forwardRef, Inject, Injectable, NotFoundException,
} from '@nestjs/common';
import { JwtPayload } from 'modules/auth/interfaces/jwt-payload';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { UserService } from 'modules/users/services';
import { Album } from 'modules/albums/entities';
import { AlbumsService } from 'modules/albums/albums.service';
import { User } from 'modules/users/entities';
import { MongoDeletePayloadType } from '_common/types/mongoDeletePayload.type';
import { Photo } from '../entities';
import { JsonPlaceholderPhoto } from '../interfaces';
import { PhotosRepo } from '../repositories';
import { GetPhotoFilters } from '../dtos';

@Injectable()
export class PhotosService {
  private static JSON_PLACE_HOLDER_URL = 'http://jsonplaceholder.typicode.com/photos';

  constructor(
    private httpService: HttpService,
    private userService: UserService,
    @Inject(forwardRef(() => AlbumsService))
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
        owner: user,
      };

      photosBulk.push(photoDto);
    }

    await this.photoRepo.createMany(photosBulk);

    return { message: 'ok' };
  }

  async getPhotos({ ownerid, maxcount, page }: GetPhotoFilters): Promise<Photo[]> {
    const user = await this.userService.getById(ownerid);

    if (!user) {
      throw new NotFoundException(`User with ${ownerid} not found`);
    }

    return this.photoRepo.findMany({
      user,
      maxcount,
      page,
    });
  }

  deletePhotosByAlbumMetaIds(ownerId: string, albumsId: string[]): Promise<MongoDeletePayloadType> {
    return this.photoRepo.deletePhotosByAlbumsMetaIds(ownerId, albumsId);
  }

  deletePhotosByMetaIds(metaIds: string[]): Promise<MongoDeletePayloadType> {
    return this.photoRepo.deletePhotosByMetaIds(metaIds);
  }
}
