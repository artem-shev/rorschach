import React from 'react';
import { Provider } from 'react-redux';

import createStore from 'store';

const store = createStore();

function App() {
  return (
    <Provider store={store}>
      <div>app</div>
    </Provider>
  );
}

export default App;
