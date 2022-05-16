import {
  Controller,
  Get,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Heartbeat Controller')
@Controller()
export class AppController {
  @Get()
  get(): string {
    return 'OK';
  }

  @Get('/api')
  getApi(): string {
    return 'OK';
  }
}
