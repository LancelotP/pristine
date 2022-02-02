import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

import { UserRelationFilter } from '../../user/dto/user.dto';

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

  @Field(() => UserRelationFilter, { nullable: true })
  @ValidateNested()
  @Type(() => UserRelationFilter)
  @IsOptional()
  author?: UserRelationFilter | null;
}

@ArgsType()
export class NotificationArgs {
  @Field(() => NotificationArgsFilter)
  @ValidateNested()
  @Type(() => NotificationArgsFilter)
  filter: NotificationArgsFilter;
}

@InputType()
export class NotificationListRelationFilter {
  @Field(() => NotificationArgsFilter, { nullable: true })
  @ValidateNested()
  @Type(() => NotificationArgsFilter)
  @IsOptional()
  every?: NotificationArgsFilter;

  @Field(() => NotificationArgsFilter, { nullable: true })
  @ValidateNested()
  @Type(() => NotificationArgsFilter)
  @IsOptional()
  some?: NotificationArgsFilter;

  @Field(() => NotificationArgsFilter, { nullable: true })
  @ValidateNested()
  @Type(() => NotificationArgsFilter)
  @IsOptional()
  none?: NotificationArgsFilter;
}

@InputType()
export class NotificationRelationFilter {
  @Field(() => NotificationArgsFilter, { nullable: true })
  @ValidateNested()
  @Type(() => NotificationArgsFilter)
  @IsOptional()
  is?: NotificationArgsFilter | null;

  @Field(() => NotificationArgsFilter, { nullable: true })
  @ValidateNested()
  @Type(() => NotificationArgsFilter)
  @IsOptional()
  isNot?: NotificationArgsFilter | null;
}
