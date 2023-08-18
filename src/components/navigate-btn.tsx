import React from 'react';
import {useNavigation} from '@react-navigation/native';

import {BasicButton} from './basic-btn';

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
