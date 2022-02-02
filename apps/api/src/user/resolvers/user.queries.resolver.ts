import { NotImplementedException } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { UserPagination, UserPaginationArgs } from '../dto/user-pagination.dto';

@Resolver()
export class UserQueriesResolver {
  @Query(() => UserPagination)
  userPagination(@Args() _args: UserPaginationArgs) {
    throw new NotImplementedException();
  }
}
