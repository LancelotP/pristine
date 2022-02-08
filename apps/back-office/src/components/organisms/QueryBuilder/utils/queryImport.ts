import type {
  ModelPropertyRelationOne,
  Query,
  QueryAttribute,
  QueryBuilderConfig,
  QueryGroup,
  QueryRelationMany,
  QueryRelationOne,
} from '../QueryBuilder';
import type {
  AGGREGATION_OPERANDS,
  GROUP_OPERANDS,
  OPERATION_OPERANDS,
} from './operand';
import {
  getOperandType,
  isAggregationOperand,
  isGroupOperand,
  isOperationOperand,
} from './operand';

export function queryImport(config: QueryBuilderConfig, input: any): Query {
  const mode = Object.keys(input).filter((key) =>
    isGroupOperand(key),
  )[0] as typeof GROUP_OPERANDS[number];

  return queryGroupImport(config, config.target, mode, input[mode]);
}

function queryGroupImport(
  config: QueryBuilderConfig,
  target: string,
  mode: QueryGroup['mode'],
  value: any,
): QueryGroup {
  const group: QueryGroup = {
    type: 'group',
    mode,
    model: target,
    value: [],
  };

  value?.forEach((v: any) => {
    const operand = Object.keys(v)[0];
    const operandType = getOperandType(config, target, operand);
    const content = v[operand];

    if (operandType === 'GROUP') {
      group.value.push(
        queryGroupImport(
          config,
          target,
          operand as QueryGroup['mode'],
          content,
        ),
      );
    }

    if (operandType === 'RELATION_ONE') {
      const relationTarget = config.models[target][
        operand
      ] as ModelPropertyRelationOne<string>;

      group.value.push(
        queryRelationOneImport(config, relationTarget.target, operand, content),
      );
    }

    if (operandType === 'RELATION_MANY') {
      const relationTarget = config.models[target][
        operand
      ] as ModelPropertyRelationOne<string>;

      group.value.push(
        queryRelationManyImport(
          config,
          relationTarget.target,
          operand,
          content,
        ),
      );
    }

    if (operandType === 'ATTRIBUTE') {
      group.value.push(queryAttributeImport(config, target, operand, content));
    }
  });

  return group;
}

function queryAttributeImport(
  config: QueryBuilderConfig,
  target: string,
  attribute: string,
  value: any,
): QueryAttribute {
  const operation = Object.keys(value).filter((key) =>
    isOperationOperand(key),
  )[0] as typeof OPERATION_OPERANDS[number] | undefined;

  const attr: QueryAttribute = {
    type: 'attribute',
    model: target,
    attribute,
    operation,
    value: operation !== undefined ? value[operation] : undefined,
  };

  return attr;
}

function queryRelationOneImport(
  config: QueryBuilderConfig,
  target: string,
  attribute: string,
  value: any,
): QueryRelationOne {
  const mode = Object.keys(value).filter((key) =>
    isGroupOperand(key),
  )[0] as typeof GROUP_OPERANDS[number];

  const relation: QueryRelationOne = {
    type: 'relation-one',
    model: target,
    attribute,
    value: queryGroupImport(config, target, mode, value[mode]),
  };

  return relation;
}

function queryRelationManyImport(
  config: QueryBuilderConfig,
  target: string,
  attribute: string,
  value: any,
): QueryRelationMany {
  const mode = Object.keys(value).filter((key) =>
    isAggregationOperand(key),
  )[0] as typeof AGGREGATION_OPERANDS[number];

  const groupMode = Object.keys(value[mode]).filter((key) =>
    isGroupOperand(key),
  )[0] as typeof GROUP_OPERANDS[number];

  const relation: QueryRelationMany = {
    type: 'relation-many',
    model: target,
    mode,
    attribute,
    value: queryGroupImport(config, target, groupMode, value[mode][groupMode]),
  };

  return relation;
}
