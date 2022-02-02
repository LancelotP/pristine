import { NotImplementedException } from '@nestjs/common';
import { Field, Resolver } from '@nestjs/graphql';

import { User } from '../../user/models/user.model';
import { Notification } from '../models/notification.model';

@Resolver(Notification)
export class NotificationFieldsResolver {
  @Field(() => User)
  author() {
    throw new NotImplementedException();
  }
}
