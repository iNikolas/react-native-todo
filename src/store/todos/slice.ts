import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {errorTypes} from '@src/constants';

import {TODOS, TodosStateType, TodoType} from './types';

const todosInitialState: TodosStateType = {
  data: null,
  isLoading: false,
  isCreating: false,
  isDeleting: false,
  errors: [],
};

export const todosSlice = createSlice({
  name: TODOS,
  initialState: todosInitialState,
  reducers: {
    getTodosAction: (state: TodosStateType) => {
      state.isLoading = true;
      state.errors = [];
    },
    deleteTodosAction: (
      state: TodosStateType,
      {payload: todosToDeleteIds}: PayloadAction<string[]>,
    ) => {
      if (!state.data || !state.data.length) {
        state.errors = [
          ...state.errors,
          {
            type: errorTypes.deletionError,
            message: 'There is no any Todo to delete in the list',
          },
        ];
        return;
      }

      state.data = state.data.filter(
        entry => !todosToDeleteIds.includes(entry.id),
      );
      state.isDeleting = true;
    },
    deleteTodosErrorAction: (
      state: TodosStateType,
      {payload: error}: PayloadAction<string>,
    ) => {
      state.errors = [
        ...state.errors,
        {type: errorTypes.deletionError, message: error},
      ];
      state.isDeleting = false;
    },
    deleteTodosSuccessAction: (state: TodosStateType) => {
      state.isDeleting = false;
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
      state.errors = [
        ...state.errors,
        {type: errorTypes.fetchError, message: error},
      ];
    },
    createNewTodoAction: (state: TodosStateType, _: PayloadAction<string>) => {
      state.isCreating = true;
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
      state.errors = [
        ...state.errors,
        {type: errorTypes.creationError, message: error},
      ];
    },
    clearCreationErrorAction: (state: TodosStateType) => {
      state.errors = state.errors.filter(
        e => e.type !== errorTypes.creationError,
      );
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
  deleteTodosAction,
  deleteTodosErrorAction,
} = todosSlice.actions;
export const todosReducer = todosSlice.reducer;
