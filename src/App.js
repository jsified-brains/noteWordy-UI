import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Root } from 'native-base';
import { AppNavigationContainer } from './routes/AppStackNavigator';
import { appReduxStore } from './redux/store';

export default class App extends Component {
  render() {
    return (
      <Provider store={appReduxStore}>
        <Root>
          <AppNavigationContainer />
        </Root>
      </Provider>
    );
  }
}
