import { ArgsType, Field, ObjectType } from '@nestjs/graphql';

import { Edge } from '../../core/dto/edge.dto';
import { Pagination, PaginationArgs } from '../../core/dto/pagination.dto';
import { User } from '../models/user.model';
import { UserArgsFilter } from './user.dto';

@ObjectType({ implements: [Edge] })
export class UserEdge extends Edge {
  @Field(() => User)
  node: User;
}

@ObjectType({ implements: [Pagination] })
export class UserPagination extends Pagination {
  @Field(() => [UserEdge])
  edges: UserEdge[];

  @Field(() => [User])
  nodes: User[];
}

@ArgsType()
export class UserPaginationArgs extends PaginationArgs {
  @Field(() => UserArgsFilter, { nullable: true })
  filter?: UserArgsFilter;
}
