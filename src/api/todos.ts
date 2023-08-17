import AsyncStorage from '@react-native-async-storage/async-storage';

import {TodoType} from '../store';

const todosKey = 'todos-react-native-app-iNikolas';

export async function getTodos(): Promise<TodoType[]> {
  const response = await AsyncStorage.getItem(todosKey);

  return response ? JSON.parse(response) : [];
}
