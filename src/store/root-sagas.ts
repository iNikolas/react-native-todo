import {all, fork} from 'redux-saga/effects';
import {watchGetTodos, watchCreateNewTodo} from './todos';

export const rootSaga = function* () {
  yield all([fork(watchGetTodos), fork(watchCreateNewTodo)]);
};
