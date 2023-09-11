import {useNavigation} from '@react-navigation/native';
import React from 'react';

import {BasicButton} from './ui-kit';

export function NavigateBtn({
  children,
  screen,
}: {
  children: string;
  screen: string;
}): JSX.Element {
  const navigation = useNavigation();

  return (
    <BasicButton title={children} onPress={() => navigation.navigate(screen)} />
  );
}
