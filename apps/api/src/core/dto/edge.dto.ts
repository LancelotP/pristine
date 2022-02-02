import { Field, ID, InterfaceType } from '@nestjs/graphql';

import { Node } from '../models/node.model';

@InterfaceType()
export class Edge<N extends Node = Node> {
  @Field(() => ID)
  cursor: string;

  @Field(() => Node)
  node: N;
}
