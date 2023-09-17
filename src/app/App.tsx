import {ThemeProvider} from '@rneui/themed';
import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {Provider} from 'react-redux';

import {store} from '@store';
import {theme} from '@theme';

import {AppRouter} from './router';

export function App(): JSX.Element {
  return (
    <>
      <SafeAreaView>
        <StatusBar />
      </SafeAreaView>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <AppRouter />
        </ThemeProvider>
      </Provider>
    </>
  );
}
