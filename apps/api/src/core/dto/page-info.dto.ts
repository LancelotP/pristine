import { Field, InterfaceType, ObjectType } from '@nestjs/graphql';

@InterfaceType()
export class IPageInfo {
  @Field(() => Boolean)
  hasNextPage: boolean;

  @Field(() => Boolean)
  hasPreviousPage: boolean;
}

@ObjectType({ implements: [IPageInfo] })
export class PageInfo extends IPageInfo {}
