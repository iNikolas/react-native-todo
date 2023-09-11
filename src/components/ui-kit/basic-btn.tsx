import React from 'react';
import {Button, ButtonProps, View} from 'react-native';

export function BasicButton(props: ButtonProps) {
  return (
    <View>
      <Button {...props} />
    </View>
  );
}
