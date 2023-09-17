import {useNavigation} from '@react-navigation/native';
import React from 'react';

import {BasicButton} from './ui-kit';

export function NavigateBtn({
  children,
  screen,
}: {
  children: React.ReactElement | string | Array<React.ReactElement | string>;
  screen: string;
}): JSX.Element {
  const navigation = useNavigation();

  return (
    <BasicButton type="clear" onPress={() => navigation.navigate(screen)}>
      {children}
    </BasicButton>
  );
}
