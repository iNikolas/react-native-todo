import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {TODOS, TodosStateType, TodoType} from './types';

const todosInitialState: TodosStateType = {
  todos: {
    data: null,
    isLoading: false,
    errors: '',
  },
};

export const todosSlice = createSlice({
  name: TODOS,
  initialState: todosInitialState,
  reducers: {
    getTodosAction: (state: TodosStateType) => {
      state.todos.isLoading = true;
      state.todos.errors = '';
    },
    getTodosSuccessAction: (
      state: TodosStateType,
      {payload: todos}: PayloadAction<TodoType[]>,
    ) => {
      state.todos.isLoading = false;
      state.todos.data = todos;
    },
    getTodosErrorAction: (
      state: TodosStateType,
      {payload: error}: PayloadAction<string>,
    ) => {
      state.todos.isLoading = false;
      state.todos.errors = error;
    },
  },
});

export const {getTodosAction, getTodosSuccessAction, getTodosErrorAction} =
  todosSlice.actions;
export const todosReducer = todosSlice.reducer;
