import { User } from 'modules/users/entities';

export class CreateAlbumDto {
  title!: string;

  owner!: User;

  metaId!: number;
}
