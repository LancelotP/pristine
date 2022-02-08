import { get, set } from 'lodash';
import type { ChangeEventHandler } from 'react';
import { useEffect, useState } from 'react';

import type { Query, QueryAttribute, QueryBuilderConfig } from './QueryBuilder';
import styles from './QueryBuilder.module.css';
import { getOperationsByAttribute } from './utils/getOperationsByAttribute';

export type QueryBuilderOperationProps = {
  config: QueryBuilderConfig;
  query: Query;
  setQuery: (q: Query) => void;
  path: string[];
};

export const QueryBuilderOperation = (props: QueryBuilderOperationProps) => {
  const { query, path, setQuery, config } = props;

  const root: QueryAttribute = path.length > 0 ? get(query, path) : query;

  const [operation, setOperation] = useState('');

  useEffect(() => {
    setOperation(root.operation ?? '');
  }, [root.operation]);

  const handleOperationChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const value = e.target.value;

    setOperation(value);
    setQuery(set({ ...query }, [...path, 'operation'], value));
  };

  return (
    <select
      className={styles['operation']}
      value={operation}
      onChange={handleOperationChange}
    >
      <option value="" disabled />
      {getOperationsByAttribute(config, root).map((operation) => (
        <option value={operation.value} key={operation.value}>
          {operation.label}
        </option>
      ))}
    </select>
  );
};
