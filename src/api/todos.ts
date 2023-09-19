import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

import {TodoType} from '@store';
import {EditTodoType} from '@types';

const todosKey = 'todos-react-native-app-iNikolas';
const validationTimeKey = 'validation-time-key';
const publicTodos = 'public-todos';

const cacheTimeToLiveHours = 2;

async function synchronizeWithDatabase({
  cache,
}: {
  cache: TodoType[];
}): Promise<TodoType[]> {
  try {
    const todosCollection = firestore().collection(publicTodos);
    const response = await todosCollection.get();

    const responseNormalized: {value: TodoType[]} = {value: []};

    response.forEach(doc => {
      const data = doc.data();
      responseNormalized.value = [
        ...responseNormalized.value,
        {
          id: doc.id,
          description: data.description,
          isDone: data.isDone,
          created: data.created,
        },
      ];
    });

    const newLocalEntries = cache.filter(
      x => !responseNormalized.value.some(e => e.id === x.id),
    );
    const newDatabaseEntries = responseNormalized.value.filter(
      x => !cache.some(e => e.id === x.id),
    );

    await Promise.allSettled(
      newLocalEntries.map(({id, isDone, description, created}) =>
        todosCollection.doc(id).set({description, isDone, created}),
      ),
    );

    return newDatabaseEntries;
  } catch (_) {
    return [];
  }
}

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

  batch.commit();

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
  firestore().collection(publicTodos).doc(todo.id).update(doc);

  return editedTodo;
}
