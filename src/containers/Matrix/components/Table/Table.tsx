import React, { useMemo } from 'react';

import styles from './Table.module.scss';

const createEmptyArray = (size: number) => [...Array(size)];

interface Props {
  size: number;
}

const Table = ({ size }: Props) => {
  const rows = useMemo(() => createEmptyArray(size), [size]);
  const cols = useMemo(() => createEmptyArray(size), [size]);

  return (
    <div className={styles.wrapper}>
      {rows.map((_, rowIndex) => (
        <div key={rowIndex} className={styles.row}>
          {cols.map((_, colIndex) => (
            <div className={styles.cell} key={colIndex} />
          ))}
        </div>
      ))}
    </div>
  );
};

Table.defaultProps = {};

export default Table;
