import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import {NewTodo, Todos} from '../screens';
import {routes} from './routes';

const Stack = createNativeStackNavigator();

export function AppRouter(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={routes.main}>
        <Stack.Screen name={routes.main} component={Todos} />
        <Stack.Screen name={routes.createTodo} component={NewTodo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
