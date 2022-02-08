import type {
  Query,
  QueryAttribute,
  QueryBuilderConfig,
  QueryGroup,
  QueryRelationMany,
  QueryRelationOne,
} from '../QueryBuilder';
import {
  isAggregationOperand,
  isGroupOperand,
  isModifierOperand,
  isOperationOperand,
} from './operand';

export function queryImport(config: QueryBuilderConfig, input: any): Query {
  const root: QueryGroup = {
    type: 'group',
    mode: 'AND',
    target: config.target,
    value: [],
  };

  const keys = Object.keys(input);

  if (keys.length === 1 && keys.includes('OR')) {
    root.mode = 'OR';
  } else if (keys.includes('OR')) {
    keys.splice(keys.indexOf('OR'), 1);
  }

  Object.keys(input).forEach((key) => {
    const isGroup = isGroupOperand(key);
    const isModifier = isModifierOperand(key);
    const isOperation = isOperationOperand(key);
    const isAggregation = isAggregationOperand(key);
    const isProperty = ![isGroup, isModifier, isOperation, isAggregation].some(
      Boolean,
    );

    const isRelationMany =
      isProperty && config.models[root.target][key].type === 'relation-many';

    const isRelationOne =
      isProperty && config.models[root.target][key].type === 'relation-one';

    const isAttribute = isProperty && !isRelationMany && !isRelationMany;

    console.log({
      key,
      isGroup,
      isModifier,
      isOperation,
      isAggregation,
      isProperty,
      isRelationMany,
      isRelationOne,
      isAttribute,
    });

    if (isGroup) {
      root.value.push(queryGroupImport(config, input[key], key, config.target));
    }

    if (isAttribute) {
      root.value.push(
        queryAttributeImport(config, input[key], key, config.target),
      );
    }
  });

  return root;
}

function queryGroupImport(
  config: QueryBuilderConfig,
  input: any,
  key: string,
  target: string,
): QueryGroup {
  const group: QueryGroup = {
    type: 'group',
    mode: 'AND',
    target: config.target,
    value: [],
  };

  return group;
}

function queryAttributeImport(
  config: QueryBuilderConfig,
  input: any,
  key: string,
  target: string,
): QueryAttribute {
  const attribute: QueryAttribute = {
    type: 'attribute',
    model: config.target,
  };

  return attribute;
}

function queryRelationOneImport(
  config: QueryBuilderConfig,
  input: any,
  key: string,
  target: string,
): QueryRelationOne {
  const relation: QueryRelationOne = {
    type: 'relation-one',
    model: config.target,
    attribute: '',
  };

  return relation;
}

function queryRelationManyImport(
  config: QueryBuilderConfig,
  input: any,
  key: string,
  target: string,
): QueryRelationMany {
  const relation: QueryRelationMany = {
    type: 'relation-many',
    model: config.target,
    attribute: '',
    mode: 'EVERY',
    value: queryGroupImport(config, input, key, target),
  };

  return relation;
}
