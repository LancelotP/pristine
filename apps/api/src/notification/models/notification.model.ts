import { ObjectType } from '@nestjs/graphql';
import { Entity } from 'typeorm';

import { Node } from '../../core/models/node.model';
import type { User } from '../../user/models/user.model';

@Entity()
@ObjectType({ implements: [Node] })
export class Notification extends Node {
  author: User;
}
