import { getCellId } from 'store/cells';

export default {
  table: 'table_wrapper',
  tableRow: 'table_row',
  getTableCellId: (rowIndex: number, colIndex: number) =>
    `table_cell_${getCellId(rowIndex, colIndex)}`,
};
