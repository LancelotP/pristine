import { get, set } from 'lodash';

import type { Query, QueryBuilderConfig } from './QueryBuilder';
import styles from './QueryBuilder.module.css';
import { QueryBuilderGroup } from './QueryBuilderGroup';

type QueryBuilderRelationProps = {
  config: QueryBuilderConfig;
  query: Query;
  setQuery: (q: Query) => void;
  path: string[];
  onRemove?: () => void;
};

export const QueryBuilderRelationMany = (props: QueryBuilderRelationProps) => {
  const { query, path, setQuery, config, onRemove } = props;

  const handleRelationModeChange = (mode: string) => {
    setQuery(set({ ...query }, [...path, 'mode'], mode));
  };

  const mode = get(query, [...path, 'mode']) as string;

  return (
    <QueryBuilderGroup
      className={styles['relation']}
      config={config}
      path={[...path, 'value']}
      query={query}
      setQuery={setQuery}
      onRemove={onRemove}
      modes={{
        value: mode,
        onChange: handleRelationModeChange,
        options: [
          { value: 'SOME', label: 'some' },
          { value: 'EVERY', label: 'every' },
          { value: 'NONE', label: 'none' },
        ],
      }}
    />
  );
};
