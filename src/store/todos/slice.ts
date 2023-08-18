import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {TODOS, TodosStateType, TodoType} from './types';

const todosInitialState: TodosStateType = {
  data: null,
  isLoading: false,
  isCreating: false,
  errors: '',
  creationError: '',
};

export const todosSlice = createSlice({
  name: TODOS,
  initialState: todosInitialState,
  reducers: {
    getTodosAction: (state: TodosStateType) => {
      state.isLoading = true;
      state.errors = '';
    },
    getTodosSuccessAction: (
      state: TodosStateType,
      {payload: todos}: PayloadAction<TodoType[]>,
    ) => {
      state.isLoading = false;
      state.data = todos;
    },
    getTodosErrorAction: (
      state: TodosStateType,
      {payload: error}: PayloadAction<string>,
    ) => {
      state.isLoading = false;
      state.errors = error;
    },
    createNewTodoAction: (
      state: TodosStateType,
      {payload: _}: PayloadAction<string>,
    ) => {
      state.isCreating = true;
      state.creationError = '';
    },
    createNewTodoSuccessAction: (
      state: TodosStateType,
      {payload: newTodo}: PayloadAction<TodoType>,
    ) => {
      state.isCreating = false;
      state.data = [newTodo, ...(state.data ?? [])];
    },
    createNewTodoErrorAction: (
      state: TodosStateType,
      {payload: error}: PayloadAction<string>,
    ) => {
      state.isCreating = false;
      state.creationError = error;
    },
    clearCreationErrorAction: (state: TodosStateType) => {
      state.creationError = '';
    },
  },
});

export const {
  getTodosAction,
  getTodosSuccessAction,
  getTodosErrorAction,
  createNewTodoAction,
  createNewTodoErrorAction,
  createNewTodoSuccessAction,
  clearCreationErrorAction,
} = todosSlice.actions;
export const todosReducer = todosSlice.reducer;
