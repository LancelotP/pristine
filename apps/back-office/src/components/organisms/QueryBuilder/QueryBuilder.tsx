import { useState } from 'react';

import styles from './QueryBuilder.module.css';
import { QueryBuilderGroup } from './QueryBuilderGroup';
import { queryExport } from './utils/queryExport';
import { queryImport } from './utils/queryImport';

export type QueryBuilderProps = {
  config: QueryBuilderConfig;
  value: unknown;
  onChange: (v: unknown) => void;
};

export const QueryBuilder = (props: QueryBuilderProps) => {
  const { config, value, onChange } = props;

  const [query, setQuery] = useState<Query>(queryImport(config, value));

  const handleChange = (value: Query) => {
    setQuery(value);
    onChange(queryExport(config, value));
  };

  return (
    <div className={styles['root']}>
      <QueryBuilderGroup
        config={config}
        query={query}
        setQuery={handleChange}
        path={[]}
      />
      <hr />
      <div className={styles['debug']}>
        <pre>{JSON.stringify(query, null, 2)}</pre>
        <pre>{JSON.stringify(queryExport(config, query), null, 2)}</pre>
      </div>
    </div>
  );
};

export type ModelPropertyBoolean = {
  type: 'boolean';
};

export type ModelPropertyString = {
  type: 'string';
};

export type ModelPropertyInteger = {
  type: 'integer';
};

export type ModelPropertyFloat = {
  type: 'float';
};

export type ModelPropertyDateTime = {
  type: 'datetime';
};

export type ModelPropertyDate = {
  type: 'date';
};

export type ModelPropertyTime = {
  type: 'time';
};

export type ModelPropertyEnum = {
  type: 'enum';
  values: string[];
};

export type ModelPropertyRelationOne<P extends string> = {
  type: 'relation-one';
  target: P;
};

export type ModelPropertyRelationMany<P extends string> = {
  type: 'relation-many';
  target: P;
};

export type ModelProperty<P extends string> = {
  isNullable?: boolean;
} & (
  | ModelPropertyBoolean
  | ModelPropertyString
  | ModelPropertyFloat
  | ModelPropertyInteger
  | ModelPropertyDateTime
  | ModelPropertyDate
  | ModelPropertyTime
  | ModelPropertyEnum
  | ModelPropertyRelationOne<P>
  | ModelPropertyRelationMany<P>
);

export type QueryBuilderConfig<
  K extends string = string,
  P extends string = string,
> = {
  target: K;
  models: Record<K, Record<P, ModelProperty<P>>>;
};

export type Query = QueryGroup;

export type QueryAttribute = {
  type: 'attribute';
  model: string;
  attribute?: string;
  operation?: string;
  value?: unknown;
};

export type QueryRelationOne = {
  type: ModelPropertyRelationOne<string>['type'];
  model: string;
  attribute: string;
  value?: QueryGroup;
};

export type QueryRelationMany = {
  type: ModelPropertyRelationMany<string>['type'];
  model: string;
  attribute: string;
  mode: 'EVERY' | 'NONE' | 'SOME';
  value: QueryGroup;
};

export type QueryGroup = {
  model: string;
  type: 'group';
  mode: 'AND' | 'OR';
  value: (QueryGroup | QueryAttribute | QueryRelationOne | QueryRelationMany)[];
};
