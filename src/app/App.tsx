import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {Provider} from 'react-redux';

import {store} from '../store';
import {AppRouter} from './router';

export function App(): JSX.Element {
  return (
    <>
      <SafeAreaView>
        <StatusBar />
      </SafeAreaView>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </>
  );
}
