import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {TodoType} from '@store';

import {publicTodos, todosKey} from '../constants';

export function getStorageKey() {
  const user = auth().currentUser;

  if (user) {
    return `${todosKey}/${user.uid}`;
  }

  return `${todosKey}/${publicTodos}`;
}

export async function synchronizeWithDatabase({
  cache,
}: {
  cache: TodoType[];
}): Promise<TodoType[]> {
  try {
    const user = auth().currentUser;
    const todosCollection = firestore().collection(user?.uid ?? publicTodos);
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
      x =>
        !responseNormalized.value.some(e => e.id === x.id) ||
        responseNormalized.value.some(
          e =>
            e.id === x.id &&
            (x.description !== e.description || x.isDone !== e.isDone),
        ),
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
