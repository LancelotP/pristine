import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

import { StringFilter } from '../../core/dto/string.filter.dto';
import type { ListRelationFilter } from '../../notification/dto/notification.dto';
import { NotificationListRelationFilter } from '../../notification/dto/notification.dto';

@InputType()
export class UserArgsFilter {
  @Field(() => [UserArgsFilter], { nullable: true })
  @ValidateNested({ each: true })
  @Type(() => UserArgsFilter)
  @IsOptional()
  AND?: UserArgsFilter[];

  @Field(() => [UserArgsFilter], { nullable: true })
  @ValidateNested({ each: true })
  @Type(() => UserArgsFilter)
  @IsOptional()
  OR?: UserArgsFilter[];

  @Field(() => UserArgsFilter, { nullable: true })
  @ValidateNested()
  @Type(() => UserArgsFilter)
  @IsOptional()
  NOT?: UserArgsFilter;

  @Field(() => NotificationListRelationFilter, { nullable: true })
  @ValidateNested()
  @Type(() => NotificationListRelationFilter)
  @IsOptional()
  notifications: NotificationListRelationFilter;

  @Field(() => StringFilter, { nullable: true })
  @ValidateNested()
  @Type(() => StringFilter)
  @IsOptional()
  email: StringFilter;
}

@ArgsType()
export class UserArgs {
  @Field(() => UserArgsFilter, { nullable: true })
  @ValidateNested()
  @Type(() => UserArgsFilter)
  @IsOptional()
  filter?: UserArgsFilter;
}

@InputType()
export class UserListRelationFilter implements ListRelationFilter {
  @Field(() => UserArgsFilter, { nullable: true })
  @ValidateNested()
  @Type(() => UserArgsFilter)
  @IsOptional()
  EVERY?: UserArgsFilter;

  @Field(() => UserArgsFilter, { nullable: true })
  @ValidateNested()
  @Type(() => UserArgsFilter)
  @IsOptional()
  SOME?: UserArgsFilter;

  @Field(() => UserArgsFilter, { nullable: true })
  @ValidateNested()
  @Type(() => UserArgsFilter)
  @IsOptional()
  NONE?: UserArgsFilter;
}
