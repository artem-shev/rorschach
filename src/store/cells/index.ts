import { Reducer } from 'redux';
import { AppState } from 'store/rootReducer';
import { mapValues } from 'lodash';

export const cellsModuleName = 'cells';

// Types
export const INITIALIZE = 'INITIALIZE';
export const TICK = 'TICK';

// Actions
const initialize = (size: number) => ({
  type: INITIALIZE,
  payload: size,
});

const tick = () => ({ type: TICK });

export const cellsActions = { initialize, tick };

// Reducer
const initialState = {};

export interface Cell {
  isAlive: boolean;
  neighbourIds: string[];
}
export type CellsState = Record<string, Cell>;

export const getCellId = (rowIndex: number, colIndex: number) => `${rowIndex}:${colIndex}`;
export const parseCellId = (cellId: string) => {
  const [rowIndex, colIndex] = cellId.split(':');

  return { rowIndex, colIndex };
};

const iterator = [-1, 0, 1];
const getNeighbourIds = (rowIndex: number, colIndex: number, size: number) => {
  const res: string[] = [];

  iterator.forEach((rowDelta) => {
    const newRowIndex = rowIndex + rowDelta;
    iterator.forEach((colDelta) => {
      const newColIndex = colIndex + colDelta;

      const newIndexesInTable =
        newColIndex >= 0 && newRowIndex >= 0 && newColIndex < size && newRowIndex < size;
      const current = newColIndex === colIndex && newRowIndex === rowIndex;

      if (newIndexesInTable && !current) {
        res.push(getCellId(newRowIndex, newColIndex));
      }
    });
  });

  return res;
};

const executor = (cells: CellsState, { neighbourIds, isAlive }: Cell) => {
  const neighbourStatuses = neighbourIds.map((id) => cells[id]?.isAlive);
  const aliveNeighboursCount = neighbourStatuses.reduce(
    (acc, status) => (status ? acc + 1 : acc),
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

const cells: Reducer<CellsState> = (state = initialState, { type, payload }) => {
  switch (type) {
    case INITIALIZE: {
      const iterator = [...Array(payload)].map((_, i) => i);

      const acc: Record<string, any> = {};

      iterator.forEach((rowIndex) => {
        iterator.forEach((colIndex) => {
          acc[getCellId(rowIndex, colIndex)] = {
            isAlive: Math.random() - 0.5 > 0,
            neighbourIds: getNeighbourIds(rowIndex, colIndex, payload),
          };
        });
      });

      return acc;
    }
    case TICK:
      return mapValues(state, (value, key) => {
        return { ...value, isAlive: executor(state, value) };
      });
    default:
      return state;
  }
};

// Selectors

const getState = (state: AppState) => state[cellsModuleName];

export const cellsSelectors = { getState };

export default cells;
