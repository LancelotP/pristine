import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

import { StringFilter } from '../../core/dto/string.filter.dto';
import { UserArgsFilter } from '../../user/dto/user.dto';

@InputType()
export class NotificationArgsFilter {
  @Field(() => [NotificationArgsFilter], { nullable: true })
  @ValidateNested({ each: true })
  @Type(() => NotificationArgsFilter)
  @IsOptional()
  AND?: NotificationArgsFilter[];

  @Field(() => [NotificationArgsFilter], { nullable: true })
  @ValidateNested({ each: true })
  @Type(() => NotificationArgsFilter)
  @IsOptional()
  OR?: NotificationArgsFilter[];

  @Field(() => NotificationArgsFilter, { nullable: true })
  @ValidateNested()
  @Type(() => NotificationArgsFilter)
  @IsOptional()
  NOT?: NotificationArgsFilter;

  @Field(() => StringFilter, { nullable: true })
  @ValidateNested()
  @Type(() => StringFilter)
  @IsOptional()
  createdAt?: StringFilter | null;

  @Field(() => UserArgsFilter, { nullable: true })
  @ValidateNested()
  @Type(() => UserArgsFilter)
  @IsOptional()
  author?: UserArgsFilter | null;
}

@ArgsType()
export class NotificationArgs {
  @Field(() => NotificationArgsFilter)
  @ValidateNested()
  @Type(() => NotificationArgsFilter)
  filter: NotificationArgsFilter;
}

@InputType()
export class NotificationListRelationFilter implements ListRelationFilter {
  @Field(() => NotificationArgsFilter, { nullable: true })
  @ValidateNested()
  @Type(() => NotificationArgsFilter)
  @IsOptional()
  EVERY?: NotificationArgsFilter;

  @Field(() => NotificationArgsFilter, { nullable: true })
  @ValidateNested()
  @Type(() => NotificationArgsFilter)
  @IsOptional()
  SOME?: NotificationArgsFilter;

  @Field(() => NotificationArgsFilter, { nullable: true })
  @ValidateNested()
  @Type(() => NotificationArgsFilter)
  @IsOptional()
  NONE?: NotificationArgsFilter;
}

export class ListRelationFilter {
  EVERY?: any;
  SOME?: any;
  NONE?: any;
}
