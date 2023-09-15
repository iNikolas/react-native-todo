import {all, fork} from 'redux-saga/effects';
import {watchCreateNewTodo, watchGetTodos} from './todos';
import {watchDeleteTodos, watchEditTodos} from './todos/sagas';

export const rootSaga = function* () {
  yield all([
    fork(watchGetTodos),
    fork(watchCreateNewTodo),
    fork(watchEditTodos),
    fork(watchDeleteTodos),
  ]);
};
