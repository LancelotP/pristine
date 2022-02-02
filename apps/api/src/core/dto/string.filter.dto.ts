import { Field, InputType, OmitType } from '@nestjs/graphql';

@InputType()
export class StringFilterNested {
  @Field(() => String, { nullable: true })
  equals?: string;

  @Field(() => [String], { nullable: true })
  in?: string[];

  @Field(() => [String], { nullable: true })
  notIn?: string[];

  @Field(() => String, { nullable: true })
  lt?: string;

  @Field(() => String, { nullable: true })
  lte?: string;

  @Field(() => String, { nullable: true })
  gt?: string;

  @Field(() => String, { nullable: true })
  gte?: string;

  @Field(() => String, { nullable: true })
  contains?: string;

  @Field(() => String, { nullable: true })
  startsWith?: string;

  @Field(() => String, { nullable: true })
  endsWith?: string;
}

@InputType()
export class StringFilter extends StringFilterNested {
  @Field(() => StringFilterNested, { nullable: true })
  not?: StringFilterNested;
}

@InputType()
export class StringNullableFilterNested extends OmitType(StringFilterNested, ['equals', 'in', 'notIn']) {
  @Field(() => String, { nullable: true })
  equals?: string | null;

  @Field(() => [String], { nullable: 'itemsAndList' })
  in?: (string | null)[];

  @Field(() => [String], { nullable: 'itemsAndList' })
  notIn?: (string | null)[];
}

@InputType()
export class StringNullableFilter extends StringNullableFilterNested {
  @Field(() => StringNullableFilterNested, { nullable: true })
  not?: StringNullableFilterNested;
}
