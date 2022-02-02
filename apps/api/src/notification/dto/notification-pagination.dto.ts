import { ArgsType, Field, ObjectType } from '@nestjs/graphql';

import { Edge } from '../../core/dto/edge.dto';
import { Pagination, PaginationArgs } from '../../core/dto/pagination.dto';
import { Notification } from '../models/notification.model';
import { NotificationArgsFilter } from './notification.dto';

@ObjectType({ implements: [Edge] })
export class NotificationEdge extends Edge {
  @Field(() => Notification)
  node: Notification;
}

@ObjectType({ implements: [Pagination] })
export class NotificationPagination extends Pagination {
  @Field(() => [NotificationEdge])
  edges: NotificationEdge[];

  @Field(() => [Notification])
  nodes: Notification[];
}

@ArgsType()
export class NotificationPaginationArgs extends PaginationArgs {
  @Field(() => NotificationArgsFilter, { nullable: true })
  filter?: NotificationArgsFilter;
}
