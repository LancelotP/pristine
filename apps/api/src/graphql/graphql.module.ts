import { Module } from '@nestjs/common';
import { GraphQLModule as NestGraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    NestGraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      path: 'graphql',
      playground: {
        cdnUrl: 'https://cdn.jsdelivr.net/npm',
      },
      cors: true,
    }),
  ],
})
export class GraphQlModule {}
