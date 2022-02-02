import { InputType } from '@nestjs/graphql';

@InputType()
export class IDFilterNested {
  equals?: string;
  in?: string[];
  notIn?: string[];
  lt?: string;
  lte?: string;
  gt?: string;
  gte?: string;
  contains?: string;
  startsWith?: string;
  endsWith?: string;
}

@InputType()
export class IDFilter extends IDFilterNested {
  not?: IDFilterNested;
}
