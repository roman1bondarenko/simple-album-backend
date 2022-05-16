import { Injectable } from '@nestjs/common';
import { JwtPayload } from 'modules/auth/interfaces/jwt-payload';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class PhotosService {
  constructor(private httpService: HttpService) {
  }

  loadPhotos({ userId }: JwtPayload): Promise<unknown> {

  }
}
