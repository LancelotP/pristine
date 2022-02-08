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

export const QueryBuilderRelationOne = (props: QueryBuilderRelationProps) => {
  const { query, path, setQuery, config, onRemove } = props;

  return (
    <QueryBuilderGroup
      className={styles['relation']}
      config={config}
      path={[...path, 'value']}
      query={query}
      setQuery={setQuery}
      onRemove={onRemove}
    />
  );
};
