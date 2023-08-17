import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {TODOS, TodosStateType, TodoType} from './types';

const todosInitialState: TodosStateType = {
  data: null,
  isLoading: false,
  errors: '',
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
  },
});

export const {getTodosAction, getTodosSuccessAction, getTodosErrorAction} =
  todosSlice.actions;
export const todosReducer = todosSlice.reducer;
