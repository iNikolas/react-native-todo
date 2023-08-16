import {todosReducer, TodosStateType} from './todos';

export type StateType = {
  todos: TodosStateType;
};

export const rootReducers = {
  todos: todosReducer,
};
