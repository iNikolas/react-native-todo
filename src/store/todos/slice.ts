import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {TODOS, TodosStateType, TodoType} from './types';

const todosInitialState: TodosStateType = {
  data: null,
  deletionQue: null,
  isLoading: false,
  isCreating: false,
  errors: '',
  creationError: '',
  deletionError: '',
};

export const todosSlice = createSlice({
  name: TODOS,
  initialState: todosInitialState,
  reducers: {
    getTodosAction: (state: TodosStateType) => {
      state.isLoading = true;
      state.errors = '';
    },
    deleteTodosAction: (
      state: TodosStateType,
      {payload: todosToDeleteIds}: PayloadAction<string[]>,
    ) => {
      if (!state.data || !state.data.length) {
        state.deletionError = 'There is no any Todo to delete in the list';
        return;
      }

      const {todos, deletionQue} = state.data.reduce<{
        todos: TodoType[];
        deletionQue: TodoType[];
      }>(
        (acc, todo) => {
          if (todosToDeleteIds.includes(todo.id)) {
            return {...acc, deletionQue: [...acc.deletionQue, todo]};
          }

          return {...acc, todos: [...acc.todos, todo]};
        },
        {todos: [], deletionQue: []},
      );

      state.deletionQue = deletionQue;
      state.data = todos;
      state.deletionError = '';
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
    createNewTodoAction: (state: TodosStateType) => {
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
