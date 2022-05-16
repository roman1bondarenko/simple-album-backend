import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';
import { Environment } from '../types/environment.type';

@Injectable()
export class AppConfigService {
  private _mongoOptions!: MongooseModuleOptions;

  private _environment!: Environment;

  private _appVersion!: string;

  private _jwtSecret!: string;

  constructor(
    private readonly configService: ConfigService,
  ) {}

  public init(): void {
    this._mongoOptions = {
      uri: this.get('MONGO_URL'),
    };

    this._environment = {
      env: this.get('NODE_ENV', 'local'),
    };

    this._appVersion = this.get('APP_VERSION', '0.0.0');

    this._jwtSecret = this.get('JWT_SECRET', 'secret');
  }

  private get(key: string, defaultValue = ''): string {
    const value = this.configService.get<string>(key);
    return value || defaultValue;
  }

  get mongoOptions(): MongooseModuleOptions {
    return this._mongoOptions;
  }

  get environment(): string {
    return this._environment.env;
  }

  get appVersion(): string {
    return this._appVersion;
  }

  get jwtSecret(): string {
    return this._jwtSecret;
  }
}
