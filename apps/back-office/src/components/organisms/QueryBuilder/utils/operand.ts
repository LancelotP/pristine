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
