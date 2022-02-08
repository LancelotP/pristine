import { get, set } from 'lodash';
import type { ChangeEventHandler } from 'react';
import { useEffect, useState } from 'react';

import type {
  Query,
  QueryAttribute,
  QueryBuilderConfig,
  QueryRelationMany,
  QueryRelationOne,
} from './QueryBuilder';
import styles from './QueryBuilder.module.css';
import { QueryBuilderOperation } from './QueryBuilderOperation';
import { QueryBuilderValue } from './QueryBuilderValue';

export type QueryBuilderAttributeProps = {
  config: QueryBuilderConfig;
  query: Query;
  setQuery: (q: Query) => void;
  path: string[];
  onRemove?: () => void;
};

export const QueryBuilderAttribute = (props: QueryBuilderAttributeProps) => {
  const { query, path, setQuery, config, onRemove } = props;

  const root: QueryAttribute = path.length > 0 ? get(query, path) : query;

  const [attribute, setAttribute] = useState('');

  useEffect(() => {
    setAttribute(root.attribute ?? '');
  }, [root.attribute]);

  const attributes = Object.keys(config.models[root.model]).map((key) => ({
    type: config.models[root.model][key].type,
    label: key,
    value: key,
  }));

  const handleAttributeChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const value = e.target.value;
    const model = config.models[root.model];

    setAttribute(value);

    const modelProperty = model[value];

    if (modelProperty.type === 'relation-one') {
      const relation: QueryRelationOne = {
        type: 'relation-one',
        model: modelProperty.target,
        attribute: value,
        value: {
          type: 'group',
          mode: 'AND',
          model: modelProperty.target,
          value: [],
        },
      };

      setQuery(set({ ...query }, path, relation));
    } else if (modelProperty.type === 'relation-many') {
      const relation: QueryRelationMany = {
        type: 'relation-many',
        model: modelProperty.target,
        attribute: value,
        mode: 'SOME',
        value: {
          type: 'group',
          mode: 'AND',
          model: modelProperty.target,
          value: [],
        },
      };

      setQuery(set({ ...query }, path, relation));
    } else {
      const attribute: QueryAttribute = {
        type: 'attribute',
        model: root.model,
        attribute: value,
      };

      setQuery(set({ ...query }, path, attribute));
    }
  };

  return (
    <div className={styles['attribute']}>
      <div className={styles['attribute__content']}>
        <div className={styles['attribute__attribute']}>
          <select value={attribute} onChange={handleAttributeChange}>
            <option value="" disabled />
            {attributes.map((attr) => (
              <option value={attr.value} key={attr.value}>
                {attr.label}
              </option>
            ))}
          </select>
        </div>
        {root.attribute !== undefined && (
          <div className={styles['attribute__operation']}>
            <QueryBuilderOperation
              config={config}
              path={path}
              query={query}
              setQuery={setQuery}
            />
          </div>
        )}
        {root.operation !== undefined && (
          <div className={styles['attribute__value']}>
            <QueryBuilderValue
              config={config}
              path={path}
              query={query}
              setQuery={setQuery}
            />
          </div>
        )}
        <button onClick={onRemove} className={styles['attribute__remove']}>
          remove
        </button>
      </div>
    </div>
  );
};
