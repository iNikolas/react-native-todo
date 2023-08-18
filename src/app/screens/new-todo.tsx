import React from 'react';
import {View} from 'react-native';

import {GoBackBtn, NewTodoInput} from '../../components';

export function NewTodo() {
  return (
    <View>
      <NewTodoInput />
      <GoBackBtn />
    </View>
  );
}
