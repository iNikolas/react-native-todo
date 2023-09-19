import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

import {TodoType} from '@store';
import {EditTodoType} from '@types';
import {
  cacheTimeToLiveHours,
  publicTodos,
  todosKey,
  validationTimeKey,
} from './constants';

import {synchronizeWithDatabase} from './utils';

export async function invalidateCache() {
  const asyncStorageKey = `${todosKey}/${publicTodos}`;
  const cacheValidationKey = `${asyncStorageKey}/${validationTimeKey}`;

  await AsyncStorage.removeItem(cacheValidationKey);
}

export async function getTodos(): Promise<TodoType[]> {
  const asyncStorageKey = `${todosKey}/${publicTodos}`;
  const cacheValidationKey = `${asyncStorageKey}/${validationTimeKey}`;

  const cacheValidationTimestamp = await AsyncStorage.getItem(
    cacheValidationKey,
  );

  const cacheCreated = new Date(
    cacheValidationTimestamp ? JSON.parse(cacheValidationTimestamp) : '',
  );
  const cacheLastedHours =
    (new Date().getTime() - cacheCreated.getTime()) / (1000 * 60 * 60);

  const stringifiedCache = await AsyncStorage.getItem(asyncStorageKey);
  const cache: TodoType[] = stringifiedCache
    ? JSON.parse(stringifiedCache)
    : [];

  if (cacheTimeToLiveHours > cacheLastedHours) {
    return cache;
  }

  const databaseEntries = await synchronizeWithDatabase({cache});

  const result = [...databaseEntries, ...cache];

  await AsyncStorage.setItem(asyncStorageKey, JSON.stringify(result));
  await AsyncStorage.setItem(cacheValidationKey, JSON.stringify(new Date()));

  return result;
}

export async function createNewTodo(description: string): Promise<TodoType> {
  const newTodo: Omit<TodoType, 'id'> = {
    description,
    created: new Date().toString(),
    isDone: false,
  };

  const asyncStorageKey = `${todosKey}/${publicTodos}`;

  const firestoreDoc = firestore().collection(publicTodos).doc();

  const todos = await getTodos();

  const result = {...newTodo, id: firestoreDoc.id};

  await AsyncStorage.setItem(
    asyncStorageKey,
    JSON.stringify([result, ...todos]),
  );

  return result;
}

export async function deleteTodos(ids: string[]): Promise<void> {
  const asyncStorageKey = `${todosKey}/${publicTodos}`;

  const todos = await getTodos();
  const newTodos = todos.filter(entry => !ids.includes(entry.id));

  if (newTodos.length === todos.length) {
    throw new Error('Unable do delete some ToDos');
  }

  const databaseTodos = firestore().collection(publicTodos);
  const batch = firestore().batch();

  ids.forEach(id => {
    batch.delete(databaseTodos.doc(id));
  });

  await batch.commit();

  return await AsyncStorage.setItem(asyncStorageKey, JSON.stringify(newTodos));
}

export async function editTodo(todo: EditTodoType): Promise<TodoType> {
  const asyncStorageKey = `${todosKey}/${publicTodos}`;
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
    throw `There is no ToDo with id ${todo.id} you are trying to edit!`;
  }

  const doc: Partial<EditTodoType> = {...todo};
  delete doc?.id;

  await AsyncStorage.setItem(asyncStorageKey, JSON.stringify(newTodos));

  return editedTodo;
}
