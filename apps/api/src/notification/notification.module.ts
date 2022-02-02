import { Module } from '@nestjs/common';

import { NotificationFieldsResolver } from './resolvers/notification.fields.resolver';
import { NotificationQueriesResolver } from './resolvers/notification.queries.resolver';

@Module({
  providers: [NotificationFieldsResolver, NotificationQueriesResolver],
})
export class NotificationModule {}
