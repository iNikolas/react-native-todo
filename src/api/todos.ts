import AsyncStorage from '@react-native-async-storage/async-storage';

import {TodoType} from '@store';
import {EditTodoType} from '@types';

const todosKey = 'todos-react-native-app-iNikolas';

export async function getTodos(): Promise<TodoType[]> {
  const response = await AsyncStorage.getItem(todosKey);

  return response ? JSON.parse(response) : [];
}

export async function createNewTodo(description: string): Promise<TodoType> {
  const newTodo: TodoType = {
    id: `${Math.random()}`,
    description,
    created: new Date().toString(),
    isDone: false,
  };

  const todos = await getTodos();

  await AsyncStorage.setItem(todosKey, JSON.stringify([newTodo, ...todos]));

  return newTodo;
}

export async function deleteToDo(id: string): Promise<string> {
  const todos = await getTodos();

  const newTodos = todos.filter(entry => entry.id !== id);

  if (newTodos.length === todos.length) {
    throw `Unable do delete ToDo with id: ${id}`;
  }

  await AsyncStorage.setItem(todosKey, JSON.stringify(newTodos));

  return id;
}

export async function editTodo(todo: EditTodoType): Promise<TodoType> {
  const todos = await getTodos();

  const {newTodos, editedTodo} = todos.reduce<{
    newTodos: TodoType[];
    editedTodo: TodoType | null;
  }>(
    (acc, entry) => {
      if (entry.id !== todo.id) {
        return {...acc, newTodos: [...acc.newTodos, entry]};
      }

      const newTodo = {...entry, ...todo};

      return {editedTodo: newTodo, newTodos: [...acc.newTodos, newTodo]};
    },
    {
      newTodos: [],
      editedTodo: null,
    },
  );

  if (!editedTodo) {
    throw `There is no ToDo with id ${todo.id} you are trying to delete!`;
  }

  await AsyncStorage.setItem(todosKey, JSON.stringify(newTodos));

  return editedTodo;
}
