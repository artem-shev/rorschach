import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  test: () => ({}),
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
