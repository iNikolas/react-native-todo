import createSagaMiddleware from '@redux-saga/core';
import {configureStore} from '@reduxjs/toolkit';

import {rootReducers} from './root-reducer';
import {rootSaga} from './root-sagas';

const sagaMiddleware = createSagaMiddleware();

sagaMiddleware.run(rootSaga);

export const store = configureStore({
  reducer: rootReducers,
  middleware: [sagaMiddleware],
});
