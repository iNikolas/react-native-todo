import {put, takeLatest} from 'redux-saga/effects';

import {GET_TODOS, TodoType} from './types';
import {getTodosErrorAction, getTodosSuccessAction} from './slice';
import {getTodos} from '../../api';

// Generator function
function* getTodosSaga() {
  try {
    const todos: TodoType[] = yield getTodos();
    yield put(getTodosSuccessAction(todos));
  } catch (error) {
    yield put(getTodosErrorAction('Failed to fetch ToDo List'));
  }
}

// Generator function
export function* watchGetTodos() {
  yield takeLatest(GET_TODOS, getTodosSaga);
}
