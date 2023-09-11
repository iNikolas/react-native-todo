import AsyncStorage from '@react-native-async-storage/async-storage';

import {TodoType} from '../store';

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
