import {put, takeLatest} from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {GET_TODOS} from './types';
import {getTodosErrorAction, getTodosSuccessAction} from './slice';

const todosKey = 'todos-react-native-app-iNikolas';

// Generator function
function* getTodosSaga() {
  try {
    const responseJson: string | null = yield AsyncStorage.getItem(todosKey);
    yield put(
      getTodosSuccessAction(responseJson ? JSON.parse(responseJson) : []),
    );
  } catch (error) {
    yield put(getTodosErrorAction('Failed to fetch ToDo List'));
  }
}

// Generator function
export function* watchGetTodos() {
  yield takeLatest(GET_TODOS, getTodosSaga);
}
