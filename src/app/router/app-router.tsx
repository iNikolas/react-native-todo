import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {routes} from './routes';
import {Todos, NewTodo} from '../screens';

const Stack = createNativeStackNavigator();

export function AppRouter(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={routes.main}>
        <Stack.Screen name={routes.main} component={Todos} />
        <Stack.Screen name={routes.createTodo} component={NewTodo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
