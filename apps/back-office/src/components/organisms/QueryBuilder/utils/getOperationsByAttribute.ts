import type {
  ModelProperty,
  QueryAttribute,
  QueryBuilderConfig,
} from '../QueryBuilder';
import type { OPERATION_OPERANDS } from './operand';

export function getOperationsByAttribute(
  config: QueryBuilderConfig,
  attribute: QueryAttribute,
) {
  if (attribute.attribute === undefined) return [];

  const property = config.models[attribute.model][attribute.attribute];

  if (property.type === 'relation-many') return [];
  if (property.type === 'relation-one') return [];

  return OPERATIONS[property.type].map((op) => ({ label: op, value: op }));
}

export const OPERATIONS: Record<
  Exclude<ModelProperty<string>['type'], 'relation-one' | 'relation-many'>,
  typeof OPERATION_OPERANDS[number][]
> = {
  string: ['equals', 'contains', 'startsWith', 'endsWith'],
  float: ['equals', 'lt', 'lte', 'gte', 'gt'],
  integer: ['equals', 'lt', 'lte', 'gte', 'gt'],
  boolean: ['equals'],
  date: ['equals', 'lt', 'lte', 'gte', 'gt'],
  datetime: ['equals', 'lt', 'lte', 'gte', 'gt'],
  time: ['equals', 'lt', 'lte', 'gte', 'gt'],
  enum: ['equals'],
};
