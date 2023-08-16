import {all, fork} from 'redux-saga/effects';
import {watchGetTodos} from './todos';

export const rootSaga = function* () {
  yield all([fork(watchGetTodos)]);
};
