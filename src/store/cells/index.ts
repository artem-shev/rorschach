import { Reducer } from 'redux';
import { AppState } from 'store/rootReducer';
import { mapValues } from 'lodash';

import { CellsState, makeCells, getIsAlive } from './helpers';

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

const cells: Reducer<CellsState> = (state = initialState, { type, payload }) => {
  switch (type) {
    case INITIALIZE:
      return makeCells(payload);

    case TICK:
      return mapValues(state, (value) => ({ ...value, isAlive: getIsAlive(state, value) }));
    default:
      return state;
  }
};

// Selectors

const getState = (state: AppState) => state[cellsModuleName];

export const cellsSelectors = { getState };

export * from './helpers';

export default cells;
