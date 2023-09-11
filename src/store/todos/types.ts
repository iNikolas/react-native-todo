export type TodoType = {
  id: string;
  isDone: boolean;
  created: string;
  description: string;
};

export type TodosStateType = {
  data: TodoType[] | null;
  deletionQue: TodoType[] | null;
  isLoading: boolean;
  isCreating: boolean;
  errors: string;
  creationError: string;
  deletionError: string;
};

export const TODOS = 'todos';
export type TODOS = typeof TODOS;

export const GET_TODOS = `${TODOS}/getTodosAction`;
export type GET_TODOS = typeof GET_TODOS;

export const CREATE_NEW_TODO = `${TODOS}/createNewTodoAction`;
export const DELETE_TODOS = `${TODOS}/deleteTodosAction`;
