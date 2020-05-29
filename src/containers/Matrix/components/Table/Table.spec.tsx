import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { makeCells } from 'store/cells';
import testIds from 'utils/constants/testIds';

import Table from './Table';
import styles from './Table.module.scss';

describe('<Table />', () => {
  const size = 50;
  const cells = makeCells(size);

  beforeEach(() => {
    render(<Table cells={cells} size={size} />);
  });

  it('should render proper number of rows', () => {
    const rows = screen.getAllByTestId(testIds.tableRow);

    expect(rows.length).toBe(50);
  });

  it('should render proper number of cells in row', () => {
    const rows = screen.getAllByTestId(testIds.tableRow);

    expect(rows.every((row) => row.childElementCount === 50)).toBe(true);
  });

  it('should add isAlive class to alive cells', () => {
    const aliveCellIds = Object.values(cells)
      .filter((cell) => cell.isAlive)
      // @ts-ignore
      .map(({ id }) => screen.getByTestId(testIds.getTableCellId(...id.split(':').map(Number))));

    expect(aliveCellIds.every((cell) => cell.classList.contains(styles.aliveCell))).toBe(true);
  });
});
