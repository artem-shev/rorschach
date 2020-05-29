import { getNeighbourIds, getCellId, makeCells, Cell } from './helpers';

describe('cells helpers', () => {
  it('should create cell id in form rowIndex:colIndex', () => {
    const rowIndex = 1;
    const colIndex = 2;

    expect(getCellId(rowIndex, colIndex)).toBe(`${rowIndex}:${colIndex}`);
  });

  it('should get ids of neighbour cells based on row and col indexes and matrix size', () => {
    const rowIndex = 5;
    const colIndex = 5;
    const size = 50;
    const neighbourIds = getNeighbourIds(rowIndex, colIndex, size);

    expect(neighbourIds).toEqual(['4:4', '4:5', '4:6', '5:4', '5:6', '6:4', '6:5', '6:6']);
  });

  it('should get ids of neighbour cells only inside existing coordinates (corners)', () => {
    const rowIndex1 = 0;
    const colIndex1 = 0;
    const rowIndex2 = 49;
    const colIndex2 = 49;
    const size = 50;
    const neighbourIds1 = getNeighbourIds(rowIndex1, colIndex1, size);
    const neighbourIds2 = getNeighbourIds(rowIndex2, colIndex2, size);

    expect(neighbourIds1).toEqual(['0:1', '1:0', '1:1']);
    expect(neighbourIds2).toEqual(['48:48', '48:49', '49:48']);
  });

  it('should create normalized cells map with cell ids in range 0 ... matrixSize - 1', () => {
    const size = 5;
    const cells = makeCells(size);
    const cellIds = Object.keys(cells);

    const idChecker = (id: string) => {
      const [row, col] = id.split(':');
      const rowIndex = Number(row);
      const colIndex = Number(col);

      return rowIndex >= 0 && rowIndex < size && colIndex >= 0 && colIndex < size;
    };

    expect(cellIds.every(idChecker)).toBe(true);
  });

  it('should create normalized cells map with cell in required shape', () => {
    const size = 5;
    const cells = makeCells(size);
    const cellsArr = Object.values(cells);

    const cellShapeChecker = (cell: Cell) => cell instanceof Cell;

    expect(cellsArr.every(cellShapeChecker)).toBe(true);
  });
});
