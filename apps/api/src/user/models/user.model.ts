import { ObjectType } from '@nestjs/graphql';

import { Node } from '../../core/models/node.model';

@ObjectType({ implements: [Node] })
export class User extends Node {}
