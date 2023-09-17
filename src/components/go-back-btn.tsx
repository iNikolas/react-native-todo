import {useNavigation} from '@react-navigation/native';
import React from 'react';

import {BasicButton, BasicIcon} from './ui-kit';

export function GoBackBtn(): JSX.Element {
  const navigation = useNavigation();

  return (
    <BasicButton type="clear" onPress={() => navigation.goBack()}>
      <BasicIcon name="arrow-back-circle-sharp" type="ionicon" />
    </BasicButton>
  );
}
