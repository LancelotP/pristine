import classNames from 'classnames';

import type { QueryBuilderConfig } from '../QueryBuilder/QueryBuilder';
import {
  isAggregationOperand,
  isGroupOperand,
  isModifierOperand,
  isOperationOperand,
} from '../QueryBuilder/utils/operand';
import styles from './QueryVisualizer.module.css';

export type QueryVisualizerProps = {
  query: any;
  config: QueryBuilderConfig;
};

export const QueryVisualizer = (props: QueryVisualizerProps) => {
  const { query, config } = props;

  // return <pre>{JSON.stringify(query, null, 2)}</pre>;

  return (
    <div className={styles['blocks']}>
      <div className={classNames(styles['block'], styles['block--target'])}>
        {config.target}
      </div>
      <InnerQueryVisualizer query={query} config={config} />
    </div>
  );
};

export const InnerQueryVisualizer = (props: QueryVisualizerProps) => {
  const { query, config } = props;

  return (
    <div className={styles['groups']}>
      {Object.keys(query).map((key) => {
        const isGroup = isGroupOperand(key);
        const isModifier = isModifierOperand(key);
        const isOperation = isOperationOperand(key);
        const isAggregation = isAggregationOperand(key);
        const isProperty = ![
          isGroup,
          isModifier,
          isOperation,
          isAggregation,
        ].some(Boolean);

        console.log({
          isGroup,
          isModifier,
          isOperation,
          isAggregation,
          isProperty,
        });

        return (
          <div key={key} className={styles['group']}>
            <div
              className={classNames(styles['block'], {
                [styles['block--group']]: isGroup,
                [styles['block--modifier']]: isModifier,
                [styles['block--operation']]: isOperation,
                [styles['block--aggregation']]: isAggregation,
                [styles['block--property']]: isProperty,
              })}
            >
              <div className={styles['block-header']}>{key}</div>
            </div>
            <div className={styles['block-content']}>
              {isGroup && (
                <div
                  className={classNames(
                    styles['block'],
                    styles['block--ghost'],
                  )}
                />
              )}
              {isGroup &&
                query[key].map((group: any, i: number) => (
                  <InnerQueryVisualizer config={config} key={i} query={group} />
                ))}
              {[isProperty, isAggregation, isModifier].some(Boolean) && (
                <InnerQueryVisualizer config={config} query={query[key]} />
              )}
              {isOperation && (
                <div
                  className={classNames(
                    styles['block'],
                    styles['block--value'],
                  )}
                >
                  <div className={styles['block-header']}>
                    {Array.isArray(query[key])
                      ? query[key].join(', ')
                      : query[key]}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
