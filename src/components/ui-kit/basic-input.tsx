import {Box, BoxProps} from '@rneui/layout';
import {ButtonProps} from '@rneui/themed';
import React from 'react';
import {TextInput} from 'react-native';

import {BasicButton} from './basic-btn';

export function BasicInput({
  btnText = 'Add',
  placeholder = 'Your text',
  onPress,
  disabled,
  initialText = '',
  btnProps,
  ...viewProps
}: {
  btnText?: string;
  placeholder?: string;
  disabled?: boolean;
  onPress: (text: string) => void;
  initialText?: string;
  btnProps?: ButtonProps;
} & BoxProps) {
  const [text, setText] = React.useState(initialText);

  return (
    <Box {...viewProps}>
      <TextInput
        value={text}
        placeholder={placeholder}
        onChangeText={setText}
      />
      <BasicButton
        disabled={!text || !!disabled}
        onPress={() => {
          setText('');
          onPress(text);
        }}
        title={btnText}
        {...btnProps}
      />
    </Box>
  );
}
