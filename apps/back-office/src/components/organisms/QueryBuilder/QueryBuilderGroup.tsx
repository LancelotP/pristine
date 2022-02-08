import classnames from 'classnames';
import { get, set } from 'lodash';

import type {
  Query,
  QueryAttribute,
  QueryBuilderConfig,
  QueryGroup,
} from './QueryBuilder';
import styles from './QueryBuilder.module.css';
import { QueryBuilderAttribute } from './QueryBuilderAttribute';
import { QueryBuilderRelationMany } from './QueryBuilderRelationMany';
import { QueryBuilderRelationOne } from './QueryBuilderRelationOne';

type QueryBuilderGroupProps = {
  className?: string;
  config: QueryBuilderConfig;
  query: Query;
  setQuery: (q: Query) => void;
  path: string[];
  modes?: {
    value: string;
    onChange: (mode: string) => void;
    options: { value: string; label: string }[];
  };
  onRemove?: () => void;
};

export const QueryBuilderGroup = (props: QueryBuilderGroupProps) => {
  const { query, path, setQuery, config, className, modes, onRemove } = props;

  const root: QueryGroup = path.length > 0 ? get(query, path) : query;

  const handleGroupModeChange = (mode: QueryGroup['mode']) => {
    setQuery(set({ ...query }, [...path, 'mode'], mode));
  };

  const handleAttributeAdd = () => {
    const attribute: QueryAttribute = {
      type: 'attribute',
      model: root.model,
    };

    setQuery(set({ ...query }, [...path, 'value'], [...root.value, attribute]));
  };

  const handleAttributeRemove = (index: number) => {
    setQuery(
      set(
        { ...query },
        [...path, 'value'],
        root.value.filter((_: unknown, i: number) => i !== index),
      ),
    );
  };

  const handleGroupAdd = () => {
    const newGroup: QueryGroup = {
      model: root.model,
      type: 'group',
      mode: 'AND',
      value: [],
    };

    setQuery(set({ ...query }, [...path, 'value'], [...root.value, newGroup]));
  };

  return (
    <div className={classnames(className, styles['group'])}>
      <div className={styles['group__header']}>
        <div className={styles['group__name']}>{getGroupName(query, path)}</div>
        {modes !== undefined && (
          <div className={styles['group__modes']}>
            {modes.options.map((option) => (
              <button
                key={option.value}
                className={classnames(styles['group__mode'], {
                  [styles['group__mode--active']]: modes.value === option.value,
                })}
                onClick={() => modes.onChange(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
        <div className={styles['group__modes']}>
          <button
            className={classnames(styles['group__mode'], {
              [styles['group__mode--active']]: root.mode === 'AND',
            })}
            onClick={() => handleGroupModeChange('AND')}
          >
            AND
          </button>
          <button
            className={classnames(styles['group__mode'], {
              [styles['group__mode--active']]: root.mode === 'OR',
            })}
            onClick={() => handleGroupModeChange('OR')}
          >
            OR
          </button>
        </div>

        {onRemove !== undefined && (
          <button className={styles['group__remove']} onClick={onRemove}>
            supprimer
          </button>
        )}
        <div className={styles['group__add']}>
          <button onClick={handleAttributeAdd}>add rule</button>
          <button onClick={handleGroupAdd}>add group</button>
        </div>
      </div>
      <div className={styles['group__content']}>
        {root.value.map((rule, i) => {
          const childPath = [...path, 'value', i.toString()].filter(Boolean);

          switch (rule.type) {
            case 'group':
              return (
                <QueryBuilderGroup
                  config={config}
                  path={childPath}
                  query={query}
                  setQuery={setQuery}
                  onRemove={() => handleAttributeRemove(i)}
                  key={[...path, i].join('_')}
                />
              );
            case 'relation-one':
              return (
                <QueryBuilderRelationOne
                  config={config}
                  path={childPath}
                  query={query}
                  setQuery={setQuery}
                  onRemove={() => handleAttributeRemove(i)}
                  key={[...path, i].join('_')}
                />
              );
            case 'relation-many':
              return (
                <QueryBuilderRelationMany
                  config={config}
                  path={childPath}
                  query={query}
                  setQuery={setQuery}
                  onRemove={() => handleAttributeRemove(i)}
                  key={[...path, i].join('_')}
                />
              );
            case 'attribute':
              return (
                <QueryBuilderAttribute
                  config={config}
                  path={childPath}
                  query={query}
                  setQuery={setQuery}
                  onRemove={() => handleAttributeRemove(i)}
                  key={[...path, i].join('_')}
                />
              );
          }

          return false;
        })}
      </div>
    </div>
  );
};

function getGroupName(query: QueryGroup, path: string[]) {
  return get(query, [...path.slice(0, -1), 'attribute'], query.model);
}
