import type {
  Query,
  QueryAttribute,
  QueryBuilderConfig,
  QueryGroup,
  QueryRelationMany,
  QueryRelationOne,
} from '../QueryBuilder';

export function queryExport(config: QueryBuilderConfig, query: Query): unknown {
  return queryGroupExport(config, query);
}

function queryGroupExport(config: QueryBuilderConfig, query: QueryGroup) {
  const subGroups = [] as unknown[];

  query.value.forEach((value) => {
    switch (value.type) {
      case 'group':
        subGroups.push(queryGroupExport(config, value));
        break;
      case 'attribute':
        subGroups.push(queryAttributeExport(config, value));
        break;
      case 'relation-one':
        subGroups.push(queryRelationOneExport(config, value));
        break;
      case 'relation-many':
        subGroups.push(queryRelationManyExport(config, value));
        break;
    }
  });

  return { [query.mode]: subGroups.filter(Boolean) };
}

function queryAttributeExport(
  config: QueryBuilderConfig,
  query: QueryAttribute,
) {
  if (query.attribute === undefined) {
    return undefined;
  }

  if (query.operation === undefined) {
    return { [query.attribute]: {} };
  }

  if (query.value === undefined) {
    return { [query.attribute]: { [query.operation]: undefined } };
  }

  return { [query.attribute]: { [query.operation]: query.value } };
}

function queryRelationOneExport(
  config: QueryBuilderConfig,
  query: QueryRelationOne,
) {
  if (query.value === undefined) return { [query.attribute]: undefined };

  return {
    [query.attribute]: queryGroupExport(config, query.value),
  };
}

function queryRelationManyExport(
  config: QueryBuilderConfig,
  query: QueryRelationMany,
) {
  return {
    [query.attribute]: { [query.mode]: queryGroupExport(config, query.value) },
  };
}
