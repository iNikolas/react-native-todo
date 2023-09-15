import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {errorTypes} from '@constants';
import {EditTodoType} from '@types';

import {TODOS, TodosStateType, TodoType} from './types';

const todosInitialState: TodosStateType = {
  data: null,
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  errors: [],
};

export const todosSlice = createSlice({
  name: TODOS,
  initialState: todosInitialState,
  reducers: {
    getTodosAction: (state: TodosStateType) => {
      state.isLoading = true;
      state.errors = state.errors.filter(
        error => error.type !== errorTypes.fetchError,
      );
    },
    editTodosAction: (
      state: TodosStateType,
      {payload: editTodoTable}: PayloadAction<{[key: string]: EditTodoType}>,
    ) => {
      if (!state.data) {
        state.errors = [
          ...state.errors,
          {
            type: errorTypes.editingError,
            message:
              'There is no any Todo in the application you are trying to Edit',
          },
        ];

        return;
      }

      state.isUpdating = true;
      state.data = state.data.map(entry => {
        const newEntryData = editTodoTable[entry.id];

        return newEntryData ? {...entry, ...newEntryData} : entry;
      });
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
    editTodosErrorAction: (
      state: TodosStateType,
      {payload: error}: PayloadAction<string>,
    ) => {
      state.isUpdating = false;
      state.errors = [
        ...state.errors,
        {type: errorTypes.editingError, message: error},
      ];
    },
    deleteTodosSuccessAction: (state: TodosStateType) => {
      state.isDeleting = false;
    },
    editTodosSuccessAction: (state: TodosStateType) => {
      state.isUpdating = false;
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
  editTodosAction,
  editTodosErrorAction,
  editTodosSuccessAction,
  deleteTodosSuccessAction,
} = todosSlice.actions;
export const todosReducer = todosSlice.reducer;
