import { NotImplementedException } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { NotificationArgs } from '../dto/notification.dto';
import { Notification } from '../models/notification.model';

@Resolver()
export class NotificationQueriesResolver {
  @Query(() => Notification, { nullable: true })
  notification(@Args() _args: NotificationArgs) {
    throw new NotImplementedException();
  }
}
