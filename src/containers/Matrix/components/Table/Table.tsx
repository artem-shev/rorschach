import React, { useMemo } from 'react';
import classNames from 'classnames';

import { CellsState, getCellId } from 'store/cells';
import styles from './Table.module.scss';

const createEmptyArray = (size: number) => [...Array(size)];

const isAlive = (rowIndex: number, colIndex: number, cells: CellsState) => {
  const id = getCellId(rowIndex, colIndex);
  return cells[id]?.isAlive;
};

interface Props {
  size: number;
  cells: CellsState;
}

const Table = ({ size, cells }: Props) => {
  const iterator = useMemo(() => createEmptyArray(size), [size]);

  return (
    <div className={styles.wrapper}>
      {iterator.map((_, rowIndex) => (
        <div key={rowIndex} className={styles.row}>
          {iterator.map((_, colIndex) => (
            <div
              className={classNames(
                styles.cell,
                isAlive(rowIndex, colIndex, cells) && styles.aliveCell,
              )}
              key={colIndex}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

Table.defaultProps = {};

export default Table;
