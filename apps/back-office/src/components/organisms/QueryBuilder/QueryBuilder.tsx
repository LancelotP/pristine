import { useEffect, useState } from 'react';

import { QueryVisualizer } from '../QueryVisualizer/QueryVisualizer';
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

  const [isGraphShown, setShowGraph] = useState(false);
  const [isTreeShown, setShowTree] = useState(false);
  const [isQueryShown, setShowQuery] = useState(false);

  useEffect(() => {
    setQuery(queryImport(config, value));
  }, [config, value]);

  const handleChange = (value: Query) => {
    setQuery(value);
    onChange(queryExport(config, value));
  };

  const handleExport = async () => {
    await navigator.clipboard.writeText(JSON.stringify(value, null, 2));

    alert('Query copier dans le presse-papier');
  };

  const handleImport = () => {
    const input = prompt('Coller votre query');

    if (input === null) return;

    try {
      onChange(JSON.parse(input));
    } catch (err) {
      alert('Une erreur est survenue');
    }
  };

  return (
    <div className={styles['root']}>
      <div className={styles['root__header']}>
        <button onClick={handleExport}>Export</button>
        <button onClick={handleImport}>Import</button>
        <button onClick={() => setShowGraph(!isGraphShown)}>
          {isGraphShown ? 'Hide' : 'Show'} graph
        </button>
        <button onClick={() => setShowTree(!isTreeShown)}>
          {isTreeShown ? 'Hide' : 'Show'} tree
        </button>
        <button onClick={() => setShowQuery(!isQueryShown)}>
          {isQueryShown ? 'Hide' : 'Show'} query
        </button>
      </div>
      <div className={styles['root__content']}>
        <QueryBuilderGroup
          config={config}
          query={query}
          setQuery={handleChange}
        />
      </div>
      {isGraphShown && (
        <div className={styles['root__graph']}>
          <QueryVisualizer config={config} query={value} />
        </div>
      )}
      {(isTreeShown || isQueryShown) && (
        <div className={styles['root_debug']}>
          {isTreeShown && <pre>{JSON.stringify(query, null, 2)}</pre>}
          {isQueryShown && <pre>{JSON.stringify(value, null, 2)}</pre>}
        </div>
      )}
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
