import classNames from 'classnames';
import { get, set } from 'lodash';
import type { ChangeEventHandler } from 'react';

import styles from './QueryBuilder.module.css';

export type QueryBuilderProps<
  C extends QueryBuilderConfig = QueryBuilderConfig,
  M extends string = string,
> = {
  config: C;
  value: any;
  onChange: (value: any) => void;
};

export function QueryBuilder(props: QueryBuilderProps) {
  const { config, value, onChange } = props;

  return (
    <div className={styles['root']}>
      <div className={styles['header']}>QueryBuilder</div>
      <div className={styles['content']}>
        <QueryBuilderGroup
          onChange={onChange}
          config={config}
          value={value}
          path={[]}
        />
        {/* {keys.map((key) => (
          <QueryBuilderProperty
            key={key}
            config={config}
            parent={parent ?? config.models[config.target]}
            value={value}
            onChange={onChange}
            disabledOptions={keys}
          />
        ))} */}
      </div>
    </div>
  );
}

type QueryBuilderGroupProps = {
  config: any;
  value: any;
  className?: string;
  path: string[];
  onChange: (v: any) => void;
};

function QueryBuilderGroup(props: QueryBuilderGroupProps) {
  const { config, value, className, path, onChange } = props;

  const root = path.length > 0 ? get(value, path) : value;

  const handleGroupTypeChange = () => {};

  const handleAddSubGroup = () => {
    const tmp = { ...value };

    const subPath = [...path, 'AND'].filter(Boolean).join('.');
    const previousValue = get(tmp, subPath, []);

    onChange(set(tmp, subPath, [...previousValue, {}]));
  };

  const handleAddSubRule = () => {
    const tmp = { ...value };

    // @ts-expect-error lodash allow to set undefined as value but not its typings
    onChange(set(tmp, path.length > 0 ? [...path, undefined] : undefined, {}));
  };

  // console.log({ root, path, value });

  const isCombinatorGroup = (key: string) => {
    return ['AND', 'OR'].includes(key);
  };

  const isRelationGroup = (key: string) => {
    const model = getTargetModel(config, path);

    return model[key].type === 'relation';
  };

  const isProperty = (key: string) => {
    const model = getTargetModel(config, path);

    return !['relation'].includes(model[key].type);
  };

  return (
    <div className={classNames(styles['group'], className)}>
      <div className={styles['group__header']}>
        Group_Header - {path.slice().pop()}
        <button onClick={handleAddSubGroup}>Add group</button>
        <button onClick={handleAddSubRule}>Add rule</button>
      </div>
      <div className={styles['group__content']}>
        <div className={styles['group__content__wrapper']}>
          {Object.keys(root).map((v) => {
            if (isCombinatorGroup(v)) {
              return root[v].map((r: any, i: number) => (
                <QueryBuilderGroup
                  className={styles['group__item']}
                  config={config}
                  value={value}
                  path={[...path, v, i.toString()]}
                  key={i}
                  onChange={onChange}
                />
              ));
            } else if (isRelationGroup(v)) {
              return (
                <QueryBuilderGroup
                  className={styles['group__item']}
                  config={config}
                  value={value}
                  path={[...path, v]}
                  key={v}
                  onChange={onChange}
                />
              );
            } else if (isProperty(v)) {
              return (
                <QueryBuilderProperty
                  className={styles['group__item']}
                  config={config}
                  value={value}
                  path={[...path, v]}
                  key={v}
                  onChange={onChange}
                />
              );
            } else {
              return <div className={styles['group__item']}>Other - {v}</div>;
            }
          })}
        </div>
      </div>
    </div>
  );
}

function getTargetModel<T extends QueryBuilderConfig>(
  config: T,
  path: string[],
) {
  let model = config.target;

  path
    .filter((value) => !['AND', 'OR', 'NOT'].includes(value))
    .filter((value) => parseInt(value).toString() !== value)
    .forEach((value) => {
      const property = config.models[model][value];

      switch (property.type) {
        case 'relation':
          model = property.target!;
          break;
        default:
          break;
      }
    });

  return config.models[model];
}

type QueryBuilderPropertyProps = {
  config: any;
  value: any;
  className?: string;
  path: string[];
  onChange: (v: any) => void;
};

function QueryBuilderProperty(props: QueryBuilderPropertyProps) {
  const { path, config, value, className, onChange } = props;

  const model = getTargetModel(config, path.slice(0, -1));
  const properties = Object.keys(model)
    .map((key) => {
      if (model[key].type !== 'relation') {
        return key;
      }

      return false;
    })
    .filter(Boolean) as string[];

  const property = path.slice(-1)[0];
  const operation = get(value, path);

  const handlePropertyChange = () => {};

  const handleOperationChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    onChange(set({ ...value }, path, { [e.target.value]: '' }));
  };

  const handleValueChange = () => {};

  return (
    <div className={classNames(styles['property'], className)}>
      <div className={classNames(styles['property__key'])}>
        <select value={property} onChange={handlePropertyChange}>
          <option defaultChecked value="" />
          {properties.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
      {!!property && (
        <div className={classNames(styles['property__operation'])}>
          <select value={operation} onChange={handleOperationChange}>
            <option defaultChecked value="" />
            {getOperationOptions(config, path).map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

function getOperationOptions(config: QueryBuilderConfig, path: string[]) {
  const model = getTargetModel(config, path.slice(0, -1));
  const property = path.slice(-1)[0];
  const type = model[property].type;

  switch (type) {
    case 'datetime':
      return ['gte', 'gt', 'lt', 'lte'];
    case 'enum':
      return config.enums[model[property].target!];
    case 'string':
      return ['startsWith', 'endWith', 'contains'];
    default:
      return [];
  }
}

export type ModelProperty<P extends string> = {
  type: 'string' | 'relation' | 'datetime' | 'enum';
  target?: P;
  nullable?: boolean;
  isArray?: true;
};

export type QueryBuilderConfig<
  K extends string = string,
  P extends string = string,
> = {
  target: K;
  models: Record<K, Record<P, ModelProperty<P>>>;
  enums: Record<string, string[]>;
};
