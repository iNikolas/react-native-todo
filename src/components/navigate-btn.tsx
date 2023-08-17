import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Button} from 'react-native';

export function NavigateBtn({
  children,
  screen,
}: {
  children: string;
  screen: string;
}): JSX.Element {
  const navigation = useNavigation();

  return (
    <Button title={children} onPress={() => navigation.navigate(screen)} />
  );
}
