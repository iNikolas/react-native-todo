import {PayloadAction} from '@reduxjs/toolkit';
import {put, takeLatest} from 'redux-saga/effects';

import {todoApi} from '@api';
import {EditTodoType} from '@types';
import {getErrorMessage, isRejected} from '@utils';

import {
  clearCreationErrorAction,
  createNewTodoErrorAction,
  createNewTodoSuccessAction,
  deleteTodosErrorAction,
  deleteTodosSuccessAction,
  editTodosErrorAction,
  editTodosSuccessAction,
  getTodosAction,
  getTodosErrorAction,
  getTodosSuccessAction,
} from './slice';
import {
  CREATE_NEW_TODO,
  DELETE_TODOS,
  EDIT_TODOS,
  GET_TODOS,
  TodoType,
} from './types';

function* getTodosSaga() {
  try {
    const todos: TodoType[] = yield todoApi.getTodos();
    yield put(getTodosSuccessAction(todos));
  } catch (error) {
    yield todoApi.invalidateCache();
    yield put(getTodosErrorAction('Failed to fetch TosDo List'));
  }
}

function* editTodosSaga({
  payload: editTodosTable,
}: PayloadAction<{[key: string]: EditTodoType}>) {
  try {
    const ids = Object.keys(editTodosTable);

    const response: Array<PromiseSettledResult<TodoType>> =
      yield Promise.allSettled(
        ids.map(id => todoApi.editTodo(editTodosTable[id])),
      );

    const rejected = response.filter(isRejected).length;

    if (rejected) {
      throw `Failed to edit ${rejected} todo${rejected > 1 ? 's' : ''}`;
    }

    yield put(editTodosSuccessAction());
  } catch (error) {
    yield put(
      editTodosErrorAction(
        getErrorMessage(error) ?? 'Failed to edit for unknown reason',
      ),
    );
    yield todoApi.invalidateCache();
    yield put(getTodosAction());
  }
}

function* createNewTodoSaga({payload: description}: PayloadAction<string>) {
  try {
    yield put(clearCreationErrorAction());
    const newTodo: TodoType = yield todoApi.createNewTodo(description);
    yield put(createNewTodoSuccessAction(newTodo));
  } catch (error) {
    yield put(
      createNewTodoErrorAction(
        getErrorMessage(error) ?? 'Failed to create for unknown reason',
      ),
    );
  }
}

function* deleteTodosSaga({payload: ids}: PayloadAction<string[]>) {
  try {
    yield todoApi.deleteTodos(ids);
    yield put(deleteTodosSuccessAction());
  } catch (error) {
    yield put(
      deleteTodosErrorAction(
        getErrorMessage(error) ?? 'Failed to delete for unknown reason',
      ),
    );
    yield todoApi.invalidateCache();
    yield put(getTodosAction());
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

export function* watchEditTodos() {
  yield takeLatest(EDIT_TODOS, editTodosSaga);
}
