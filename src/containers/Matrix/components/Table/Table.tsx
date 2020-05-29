import React, { useMemo } from 'react';
import classNames from 'classnames';

import { CellsState, getCellId } from 'store/cells';
import styles from './Table.module.scss';
import testIds from 'utils/constants/testIds';

const createEmptyArray = (size: number) => [...Array(size)];

const isAlive = (rowIndex: number, colIndex: number, cells: CellsState) => {
  const id = getCellId(rowIndex, colIndex);
  return cells[id]?.isAlive;
};

interface Props {
  size: number;
  cells: CellsState;
}

const Table: React.FC<Props> = ({ size, cells }: Props) => {
  const iterator = useMemo(() => createEmptyArray(size), [size]);

  return (
    <div className={styles.wrapper} data-testid={testIds.table}>
      {iterator.map((_, rowIndex) => (
        <div key={rowIndex} className={styles.row} data-testid={testIds.tableRow}>
          {iterator.map((_, colIndex) => (
            <div
              className={classNames(
                styles.cell,
                isAlive(rowIndex, colIndex, cells) && styles.aliveCell,
              )}
              key={colIndex}
              data-testid={testIds.getTableCellId(rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

Table.defaultProps = {};

export default Table;
