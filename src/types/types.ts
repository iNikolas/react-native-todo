import {TodoType} from '@store';

export type ObjectValues<T> = T[keyof T];

export type EditTodoType = Pick<TodoType, 'id'> &
  Partial<Pick<TodoType, 'isDone' | 'description'>>;

export type EditTodoTableType = {[key: string]: EditTodoType};
