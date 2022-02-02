import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { appConfig, appSchema } from './configurations/app.config';
import { ConfigService } from './services/config.service';

@Module({
  imports: [
    NestConfigModule.forRoot({
      cache: true,
      load: [appConfig],
      validationSchema: Joi.object({
        ...appSchema,
      }),
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
