import { Reducer } from 'redux';
import { AppState } from 'store/rootReducer';

export const cellsModuleName = 'cells';

// Types
export const INITIALIZE = 'INITIALIZE';

// Actions
const initialize = (size: number) => ({
  type: INITIALIZE,
  payload: size,
});

export const cellsActions = { initialize };

// Reducer
const initialState = {};

export interface Cell {
  isAlive: boolean;
}
export type CellsState = Record<string, Cell>;

export const getCellId = (rowIndex: number, colIndex: number) => `${rowIndex}:${colIndex}`;

const cells: Reducer<CellsState> = (state = initialState, { type, payload }) => {
  switch (type) {
    case INITIALIZE: {
      const iterator = [...Array(payload)].map((_, i) => i);

      const acc: Record<string, any> = {};

      iterator.forEach((rowIndex) => {
        iterator.forEach((colIndex) => {
          acc[getCellId(rowIndex, colIndex)] = { isAlive: Math.random() - 0.5 > 0 };
        });
      });

      return acc;
    }
    default:
      return state;
  }
};

// Selectors

const getState = (state: AppState) => state[cellsModuleName];

export const cellsSelectors = { getState };

export default cells;
