import type { QueryBuilderConfig } from './QueryBuilder';

export type OperationSelectorProps<K extends string = string, P extends string = string> = {
  config: QueryBuilderConfig<K, P>;
  target: K;
  property: P;
};

export function OperationSelector(props: OperationSelectorProps) {
  const { config, target, property } = props;

  const modelProperty = config.models[target][property];

  console.log(modelProperty);

  return (
    <select value={property}>
      <option />
    </select>
  );
}
