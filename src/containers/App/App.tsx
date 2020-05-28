import React from 'react';
import { Provider } from 'react-redux';

import createStore from 'store';
import Matrix from 'containers/Matrix';

const store = createStore();

function App() {
  return (
    <Provider store={store}>
      <Matrix />
    </Provider>
  );
}

export default App;
