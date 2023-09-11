import {useNavigation} from '@react-navigation/native';
import React from 'react';

import {BasicButton} from './ui-kit';

export function GoBackBtn(): JSX.Element {
  const navigation = useNavigation();

  return <BasicButton title="Go back" onPress={() => navigation.goBack()} />;
}
