import { combineReducers } from 'redux';

import cells, { cellsModuleName } from './cells';

const rootReducer = combineReducers({
  [cellsModuleName]: cells,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;

export * from './cells';
