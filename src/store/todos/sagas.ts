import {PayloadAction} from '@reduxjs/toolkit';
import {put, takeLatest} from 'redux-saga/effects';

import {CREATE_NEW_TODO, GET_TODOS, TodoType} from './types';
import {
  createNewTodoErrorAction,
  createNewTodoSuccessAction,
  getTodosErrorAction,
  getTodosSuccessAction,
} from './slice';
import {createNewTodo, getTodos} from '../../api';

function* getTodosSaga() {
  try {
    const todos: TodoType[] = yield getTodos();
    yield put(getTodosSuccessAction(todos));
  } catch (error) {
    yield put(getTodosErrorAction('Failed to fetch ToDo List'));
  }
}

function* createNewTodoSaga({payload: description}: PayloadAction<string>) {
  try {
    const newTodo: TodoType = yield createNewTodo(description);
    yield put(createNewTodoSuccessAction(newTodo));
  } catch (error) {
    yield put(createNewTodoErrorAction('Failed to create new ToDo'));
  }
}

export function* watchGetTodos() {
  yield takeLatest(GET_TODOS, getTodosSaga);
}

export function* watchCreateNewTodo() {
  yield takeLatest(CREATE_NEW_TODO, createNewTodoSaga);
}
