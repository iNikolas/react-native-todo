import {todosReducer, TodosStateType} from './todos';
import {userReducer, UserStateType} from './user';

export type StateType = {
  todos: TodosStateType;
  user: UserStateType;
};

export const rootReducers = {
  todos: todosReducer,
  user: userReducer,
};
