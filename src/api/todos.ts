import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

import {TodoType} from '@store';
import {EditTodoType} from '@types';

const todosKey = 'todos-react-native-app-iNikolas';
const validationTimeKey = 'validation-time-key';
const publicTodos = 'public-todos';

const cacheTimeToLiveHours = 2;

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

  if (cacheTimeToLiveHours > cacheLastedHours) {
    const response = await AsyncStorage.getItem(asyncStorageKey);

    return response ? JSON.parse(response) : [];
  }

  const response = await firestore().collection(publicTodos).get();

  const result: {value: TodoType[]} = {value: []};

  response.forEach(doc => {
    const data = doc.data();
    result.value = [
      ...result.value,
      {
        id: doc.id,
        description: data.description,
        isDone: data.isDone,
        created: data.created,
      },
    ];
  });

  await AsyncStorage.setItem(asyncStorageKey, JSON.stringify(result.value));
  await AsyncStorage.setItem(cacheValidationKey, JSON.stringify(new Date()));

  return result.value;
}

export async function createNewTodo(description: string): Promise<TodoType> {
  const newTodo: Omit<TodoType, 'id'> = {
    description,
    created: new Date().toString(),
    isDone: false,
  };

  const asyncStorageKey = `${todosKey}/${publicTodos}`;

  const {id} = await firestore().collection(publicTodos).add(newTodo);

  const todos = await getTodos();

  const result = {...newTodo, id};

  await AsyncStorage.setItem(
    asyncStorageKey,
    JSON.stringify([result, ...todos]),
  );

  return result;
}

export async function deleteTodos(ids: string[]): Promise<void> {
  const asyncStorageKey = `${todosKey}/${publicTodos}`;

  const todosSnapshot = await firestore().collection(publicTodos).get();
  const batch = firestore().batch();

  todosSnapshot.forEach(documentSnapshot => {
    batch.delete(documentSnapshot.ref);
  });

  await batch.commit();

  const todos = await getTodos();

  const newTodos = todos.filter(entry => !ids.includes(entry.id));

  if (newTodos.length === todos.length) {
    throw `Unable do delete ToDo with id: ${ids}`;
  }

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

  await firestore().collection(publicTodos).doc(todo.id).update(doc);

  await AsyncStorage.setItem(asyncStorageKey, JSON.stringify(newTodos));

  return editedTodo;
}
