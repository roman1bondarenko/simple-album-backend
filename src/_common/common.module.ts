import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfigService } from './services/app-config.service';

@Module({
  imports: [CommonModule],
  providers: [
    ConfigService,
    {
      provide: AppConfigService,
      inject: [ConfigService],
      useFactory: ((configService: ConfigService) => {
        const appConfigService = new AppConfigService(configService);
        appConfigService.init();
        return appConfigService;
      }),
    },
    {
      provide: 'NODE_ENV',
      inject: [AppConfigService],
      useFactory: ({ environment }: AppConfigService): string => environment,
    },
  ],
  exports: [
    ConfigService,
    AppConfigService,
    'NODE_ENV',
  ],
})
export class CommonModule {}
