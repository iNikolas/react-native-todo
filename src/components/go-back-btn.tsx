import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Button} from 'react-native';

export function GoBackBtn(): JSX.Element {
  const navigation = useNavigation();

  return <Button title="Go back" onPress={() => navigation.goBack()} />;
}
