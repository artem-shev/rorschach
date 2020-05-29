export interface ICell {
  id: string;
  isAlive: boolean;
  neighbourIds: string[];
}
export type CellsState = Record<string, Cell>;

export const getCellId = (rowIndex: number, colIndex: number) => `${rowIndex}:${colIndex}`;

const iterator = [-1, 0, 1];
export const getNeighbourIds = (rowIndex: number, colIndex: number, size: number) =>
  iterator.reduce((acc, rowDelta) => {
    const newRowIndex = rowIndex + rowDelta;

    const neighbourIds = iterator.reduce((acc, colDelta) => {
      const newColIndex = colIndex + colDelta;
      const newIndexesInTable =
        newColIndex >= 0 && newRowIndex >= 0 && newColIndex < size && newRowIndex < size;
      const current = newColIndex === colIndex && newRowIndex === rowIndex;

      if (newIndexesInTable && !current) {
        acc.push(getCellId(newRowIndex, newColIndex));
      }

      return acc;
    }, [] as string[]);

    return [...acc, ...neighbourIds];
  }, [] as string[]);

export const getIsAlive = (cells: CellsState, { neighbourIds, isAlive }: Cell) => {
  const aliveNeighboursCount = neighbourIds.reduce(
    (acc, id) => (cells[id]?.isAlive ? acc + 1 : acc),
    0,
  );

  if (!isAlive) return aliveNeighboursCount === 3;

  if (aliveNeighboursCount < 2 || aliveNeighboursCount > 3) return false;

  return isAlive;

  // isAlive &&
  // if (liveNeighbours < 2) die
  // if (liveNeighbours === 2 || 3) persist
  // if (liveNeighbours > 3) die

  // !isAlive &&
  // if (liveNeighbours === 3) live
};

export class Cell implements ICell {
  id: string;
  neighbourIds: string[];

  constructor(
    rowIndex: number,
    colIndex: number,
    matrixSize: number,
    public isAlive = Math.random() - 0.5 > 0,
  ) {
    this.id = getCellId(rowIndex, colIndex);
    this.neighbourIds = getNeighbourIds(rowIndex, colIndex, matrixSize);
  }
}

export const makeCells = (size: number) => {
  const iterator = [...Array(size)].map((_, i) => i);

  return iterator.reduce((acc, rowIndex) => {
    const rowCells = iterator.reduce(
      (acc, colIndex) => ({
        ...acc,
        [getCellId(rowIndex, colIndex)]: new Cell(rowIndex, colIndex, size),
      }),
      {} as CellsState,
    );

    return { ...acc, ...rowCells };
  }, {} as CellsState);
};
