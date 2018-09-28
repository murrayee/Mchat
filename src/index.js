import React, { Component } from 'react';
import { Provider } from 'react-redux';
import AppNavigator from './navigation/index';
import storeConfigure from './store';
import rootSaga from './sagas' ;

const store = storeConfigure();
store.runSaga(rootSaga);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator/>
      </Provider>
    );
  }
}

export default App;