import type { ModelProperty, QueryBuilderConfig } from '../QueryBuilder';

export const MODIFIER_OPERANDS = ['NOT'] as const;
export const GROUP_OPERANDS = ['OR', 'AND'] as const;
export const AGGREGATION_OPERANDS = ['SOME', 'EVERY', 'NONE'] as const;
export const OPERATION_OPERANDS = [
  'equals',
  'contains',
  'startsWith',
  'endsWith',
  'lt',
  'lte',
  'gte',
  'gt',
] as const;

export function isModifierOperand(
  value: string,
): value is typeof MODIFIER_OPERANDS[number] {
  return (MODIFIER_OPERANDS as ReadonlyArray<string>).includes(value);
}

export function isGroupOperand(
  value: string,
): value is typeof GROUP_OPERANDS[number] {
  return (GROUP_OPERANDS as ReadonlyArray<string>).includes(value);
}

export function isAggregationOperand(
  value: string,
): value is typeof AGGREGATION_OPERANDS[number] {
  return (AGGREGATION_OPERANDS as ReadonlyArray<string>).includes(value);
}

export function isOperationOperand(
  value: string,
): value is typeof OPERATION_OPERANDS[number] {
  return (OPERATION_OPERANDS as ReadonlyArray<string>).includes(value);
}

export function getOperandType(
  config: QueryBuilderConfig,
  target: string,
  operand: string,
) {
  if (isGroupOperand(operand)) {
    return 'GROUP';
  } else if (isModifierOperand(operand)) {
    return 'OPERAND';
  } else if (isOperationOperand(operand)) {
    return 'OPERATION';
  } else if (isAggregationOperand(operand)) {
    return 'AGGREGATION';
  }

  const model = config.models[target];
  const property = model[operand] as ModelProperty<string> | undefined;

  if (!property) {
    return null;
  }

  if (property.type === 'relation-many') {
    return 'RELATION_MANY';
  } else if (property.type === 'relation-one') {
    return 'RELATION_ONE';
  } else {
    return 'ATTRIBUTE';
  }
}
