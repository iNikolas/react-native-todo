import React from 'react';
import {Text, View} from 'react-native';

import {TodoType} from '../../store';

export function Todo({description, isDone, created}: Omit<TodoType, 'id'>) {
  return (
    <View>
      <Text>{created}</Text>
      <Text>{description}</Text>
      <Text>{isDone ? 'Done' : 'Not Done'}</Text>
    </View>
  );
}
