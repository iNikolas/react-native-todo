import {errorTypes} from '@constants';
import {ObjectValues} from '@types';

type ErrorType = {type: ObjectValues<typeof errorTypes>; message: string};

export type TodoType = {
  id: string;
  isDone: boolean;
  created: string;
  description: string;
};

export type TodosStateType = {
  data: TodoType[] | null;
  isLoading: boolean;
  isCreating: boolean;
  isDeleting: boolean;
  isUpdating: boolean;
  errors: ErrorType[];
};

export const TODOS = 'todos';
export type TODOS = typeof TODOS;

export const GET_TODOS = `${TODOS}/getTodosAction`;
export type GET_TODOS = typeof GET_TODOS;

export const CREATE_NEW_TODO = `${TODOS}/createNewTodoAction`;
export const DELETE_TODOS = `${TODOS}/deleteTodosAction`;
export const EDIT_TODOS = `${TODOS}/editTodosAction`;
