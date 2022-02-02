import { Field, InputType, Int, InterfaceType } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';
import type { SelectQueryBuilder } from 'typeorm';

import { Node } from '../models/node.model';
import { Edge } from './edge.dto';
import { PageInfo } from './page-info.dto';

@InputType()
export class PaginationArgs {
  @Field(() => Int, { defaultValue: 0, nullable: true })
  @Min(0)
  skip: number;

  @Field(() => Int, { defaultValue: 20, nullable: true })
  @Min(0)
  @Max(50)
  take: number;
}

@InterfaceType()
export class Pagination<N extends Node = Node> {
  @Field(() => Int)
  totalCount: number;

  @Field(() => PageInfo)
  pageInfo: PageInfo;

  @Field(() => [Node])
  nodes: N[];

  @Field(() => [Edge])
  edges: Edge<N>[];

  query: SelectQueryBuilder<N>;
}
