import {PayloadAction} from '@reduxjs/toolkit';
import {put, takeEvery, takeLatest} from 'redux-saga/effects';

import {createNewTodo, deleteToDo, getTodos} from '../../api';
import {
  clearCreationErrorAction,
  createNewTodoErrorAction,
  createNewTodoSuccessAction,
  deleteTodosErrorAction,
  getTodosErrorAction,
  getTodosSuccessAction,
} from './slice';
import {CREATE_NEW_TODO, DELETE_TODOS, GET_TODOS, TodoType} from './types';

import {isRejected} from '@utils';

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }
};

function* getTodosSaga() {
  try {
    const todos: TodoType[] = yield getTodos();
    yield put(getTodosSuccessAction(todos));
  } catch (error) {
    yield put(getTodosErrorAction('Failed to fetch TosDo List'));
  }
}

function* createNewTodoSaga({payload: description}: PayloadAction<string>) {
  try {
    yield put(clearCreationErrorAction());
    const newTodo: TodoType = yield createNewTodo(description);
    yield put(createNewTodoSuccessAction(newTodo));
  } catch (error) {
    yield put(createNewTodoErrorAction('Failed to create new ToDo'));
  }
}

function* deleteTodosSaga({payload: ids}: PayloadAction<string[]>) {
  try {
    const response: Array<PromiseSettledResult<string>> =
      yield Promise.allSettled(ids.map(id => deleteToDo(id)));

    const rejected = response.filter(isRejected).length;

    if (rejected) {
      throw `Failed to delete ${rejected} todo${rejected > 1 ? 's' : ''}`;
    }
  } catch (error) {
    yield put(
      deleteTodosErrorAction(getErrorMessage(error) ?? 'Failed to delete'),
    );
  }
}

export function* watchGetTodos() {
  yield takeLatest(GET_TODOS, getTodosSaga);
}

export function* watchCreateNewTodo() {
  yield takeLatest(CREATE_NEW_TODO, createNewTodoSaga);
}

export function* watchDeleteTodos() {
  yield takeEvery(DELETE_TODOS, deleteTodosSaga);
}
