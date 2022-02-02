import { Module } from '@nestjs/common';

import { ConfigModule } from './config/config.module';
import { GraphQlModule } from './graphql/graphql.module';
import { LoggerModule } from './logger/logger.module';
import { NotificationModule } from './notification/notification.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ConfigModule, LoggerModule, GraphQlModule, UserModule, NotificationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
