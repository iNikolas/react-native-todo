import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {useSelector} from 'react-redux';

import {StateType} from '@store';

import {NewTodo, PhoneSignIn, Todos} from '../screens';
import {routes} from './routes';

const Stack = createNativeStackNavigator();

export function AppRouter(): JSX.Element {
  const user = useSelector((state: StateType) => state.user.data);

  const authorized = Boolean(user);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={authorized ? routes.main : routes.signIn}>
        {authorized ? (
          <>
            <Stack.Screen name={routes.main} component={Todos} />
            <Stack.Screen
              name={routes.createTodo}
              component={NewTodo}
              options={{presentation: 'transparentModal', animation: 'fade'}}
            />
          </>
        ) : (
          <Stack.Screen name={routes.signIn} component={PhoneSignIn} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
