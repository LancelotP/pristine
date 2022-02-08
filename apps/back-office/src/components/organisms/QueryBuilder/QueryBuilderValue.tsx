import { get, set } from 'lodash';
import type { ChangeEventHandler } from 'react';

import type { Query, QueryAttribute, QueryBuilderConfig } from './QueryBuilder';

export type QueryBuilderValueProps = {
  config: QueryBuilderConfig;
  query: Query;
  setQuery: (q: Query) => void;
  path: string[];
};

export const QueryBuilderValue = (props: QueryBuilderValueProps) => {
  const { query, path, setQuery, config } = props;

  const root: QueryAttribute = path.length > 0 ? get(query, path) : query;
  const model = config.models[root.model];

  if (root.attribute === undefined || root.operation === undefined) {
    return null;
  }

  const attribute = model[root.attribute];

  const handleValueChange = (value: unknown) => {
    setQuery(set({ ...query }, [...path, 'value'], value));
  };

  const bag = { value: root.value, onChange: handleValueChange };

  switch (attribute.type) {
    case 'boolean':
      return <QueryBuilderValueBoolean {...bag} />;
    case 'date':
      return <QueryBuilderValueDate {...bag} />;
    case 'datetime':
      return <QueryBuilderValueDatetime {...bag} />;
    case 'time':
      return <QueryBuilderValueTime {...bag} />;
    case 'integer':
      return <QueryBuilderValueInteger {...bag} />;
    case 'float':
      return <QueryBuilderValueFloat {...bag} />;
    case 'string':
      return <QueryBuilderValueString {...bag} />;
    case 'enum':
      return (
        <QueryBuilderValueEnum
          {...bag}
          options={attribute.values.map((v) => ({ label: v, value: v }))}
        />
      );
    default:
      return <div>Not implemented</div>;
  }
};

type QueryBuilderValueComponentProps = {
  value: unknown;
  onChange: (v: unknown) => void;
};

const QueryBuilderValueString = (props: QueryBuilderValueComponentProps) => {
  const { value, onChange } = props;

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange(e.target.value);
  };

  return (
    <input
      type="text"
      value={value as string | undefined}
      onChange={handleChange}
    />
  );
};

const QueryBuilderValueFloat = (props: QueryBuilderValueComponentProps) => {
  const { value, onChange } = props;

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange(parseFloat(e.target.value));
  };

  return (
    <input
      type="number"
      value={value as number | undefined}
      onChange={handleChange}
    />
  );
};

const QueryBuilderValueInteger = (props: QueryBuilderValueComponentProps) => {
  const { value, onChange } = props;

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange(parseInt(e.target.value));
  };

  return (
    <input
      type="number"
      value={value as number | undefined}
      onChange={handleChange}
    />
  );
};

const QueryBuilderValueEnum = (
  props: QueryBuilderValueComponentProps & {
    options: { value: string; label: string }[];
  },
) => {
  const { value, onChange, options } = props;

  const handleChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    onChange(e.target.value);
  };

  return (
    <select defaultValue="" value={value as string} onChange={handleChange}>
      <option value="" disabled />
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

const QueryBuilderValueDate = (props: QueryBuilderValueComponentProps) => {
  const { value, onChange } = props;

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange(e.target.value);
  };

  return (
    <input
      type="date"
      value={value as string | undefined}
      onChange={handleChange}
    />
  );
};

const QueryBuilderValueDatetime = (props: QueryBuilderValueComponentProps) => {
  const { value, onChange } = props;

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange(e.target.value);
  };

  // FIXME

  return (
    <input
      type="datetime-local"
      value={value as string | undefined}
      onChange={handleChange}
    />
  );
};

const QueryBuilderValueTime = (props: QueryBuilderValueComponentProps) => {
  const { value, onChange } = props;

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange(e.target.value);
  };

  return (
    <input
      type="time"
      value={value as string | undefined}
      onChange={handleChange}
    />
  );
};

const QueryBuilderValueBoolean = (props: QueryBuilderValueComponentProps) => {
  const { value, onChange } = props;

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange(e.target.value);
  };

  // FIXME

  return (
    <input
      type="number"
      value={value as string | undefined}
      onChange={handleChange}
    />
  );
};
