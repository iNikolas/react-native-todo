import React from 'react';
import {View} from 'react-native';

import {NavigateBtn, TodosList} from '../../components';
import {routes} from '../router';

export function Todos(): JSX.Element {
  return (
    <View>
      <NavigateBtn screen={routes.createTodo}>Create New Todo</NavigateBtn>
      <TodosList />
    </View>
  );
}
