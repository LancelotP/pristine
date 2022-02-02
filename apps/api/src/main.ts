import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { ConfigService } from './config/services/config.service';
import { LoggerService } from './logger/services/logger.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { bufferLogs: true });

  const config = app.get(ConfigService);
  const logger = app.get(LoggerService);

  logger.setContext('Bootstrap');

  app.useLogger(logger);

  app.enableCors();
  app.use(cookieParser(config.app.cookieSecret));
  // app.use(csurf({ cookie: true }));

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: [`'self'`],
          imgSrc: [
            `'self'`,
            'data:',
            'https://cdn.jsdelivr.net/npm/@apollographql/graphql-playground-react@1.7.42/build/favicon.png',
          ],
          scriptSrc: [
            `'self'`,
            'https://cdn.jsdelivr.net/npm/@apollographql/graphql-playground-react@1.7.42/build/static/js/middleware.js',
            `'sha256-jy0ROHCLlkmrjNmmholpRXAJgTmhuirtXREXGa8VmVU='`,
          ],
        },
      },
    }),
  );

  const port = config.app.port;
  await app.listen(port);

  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

void bootstrap();
