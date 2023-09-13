import {PayloadAction} from '@reduxjs/toolkit';
import {put, takeLatest} from 'redux-saga/effects';

import {createNewTodo, deleteToDo, getTodos} from '../../api';
import {
  createNewTodoErrorAction,
  createNewTodoSuccessAction,
  deleteTodosErrorAction,
  getTodosErrorAction,
  getTodosSuccessAction,
} from './slice';
import {CREATE_NEW_TODO, DELETE_TODOS, GET_TODOS, TodoType} from './types';

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
    const newTodo: TodoType = yield createNewTodo(description);
    yield put(createNewTodoSuccessAction(newTodo));
  } catch (error) {
    yield put(createNewTodoErrorAction('Failed to create new ToDo'));
  }
}

function* deleteTodosSaga({payload: ids}: PayloadAction<string[]>) {
  try {
    yield Promise.all(ids.map(id => deleteToDo(id)));
  } catch (error) {
    yield put(deleteTodosErrorAction('Failed to delete'));
  }
}

export function* watchGetTodos() {
  yield takeLatest(GET_TODOS, getTodosSaga);
}

export function* watchCreateNewTodo() {
  yield takeLatest(CREATE_NEW_TODO, createNewTodoSaga);
}

export function* watchDeleteTodos() {
  yield takeLatest(DELETE_TODOS, deleteTodosSaga);
}
