import React, { useMemo } from 'react';
import classNames from 'classnames';

import styles from './Table.module.scss';
import { CellsState, getCellId } from 'store/cells';

const createEmptyArray = (size: number) => [...Array(size)];

interface Props {
  size: number;
  cells: CellsState;
}

const isAlive = (rowIndex: number, colIndex: number, cells: CellsState) => {
  const id = getCellId(rowIndex, colIndex);
  return cells[id]?.isAlive;
};

const Table = ({ size, cells }: Props) => {
  const rows = useMemo(() => createEmptyArray(size), [size]);
  const cols = useMemo(() => createEmptyArray(size), [size]);

  return (
    <div className={styles.wrapper}>
      {rows.map((_, rowIndex) => (
        <div key={rowIndex} className={styles.row}>
          {cols.map((_, colIndex) => (
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
