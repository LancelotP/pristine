import { Module } from '@nestjs/common';

import { UserFieldsResolver } from './resolvers/user.fields.resolver';
import { UserQueriesResolver } from './resolvers/user.queries.resolver';
import { UserService } from './user.service';

@Module({
  providers: [UserService, UserFieldsResolver, UserQueriesResolver],
})
export class UserModule {}
