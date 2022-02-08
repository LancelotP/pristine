import type { QueryBuilderConfig } from './QueryBuilder';

export type PropertySelectorProps<
  C extends QueryBuilderConfig = QueryBuilderConfig,
  M extends string = string,
  P extends keyof C['models'][M] = keyof C['models'][M],
> = {
  config: C;
  model: C['models'][M];
  value?: P;
  onChange?: (value: P | undefined) => void;
};

const COMBINATORS = ['AND', 'OR'];

export function PropertySelector(props: PropertySelectorProps) {
  const { model, value, onChange } = props;

  const properties = Object.keys(model).filter((key) => !COMBINATORS.includes(key));

  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    onChange?.(e.target.value);
  };

  return (
    <select value={value} onChange={handleChange}>
      <option />
      {properties.map((property) => {
        return (
          <option key={property} value={property}>
            {property}
          </option>
        );
      })}
    </select>
  );
}
