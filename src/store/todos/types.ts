export type TodoType = {
  id: string;
  isDone: boolean;
  created: string;
  description: string;
};

export type ITodosState = {
  data: TodoType[] | null;
  isLoading: boolean;
  errors: string;
};

export type TodosStateType = {
  todos: ITodosState;
};

export const TODOS = 'todos';
export type TODOS = typeof TODOS;

export const GET_TODOS = `${TODOS}/getTodos`;
export type GET_TODOS = typeof GET_TODOS;
