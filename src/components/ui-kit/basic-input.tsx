import {Box} from '@rneui/layout';
import {ButtonProps, Input, InputProps} from '@rneui/themed';
import React from 'react';
import {View, ViewProps} from 'react-native';

import {BasicButton} from './basic-btn';

export function BasicInput({
  btnContent: btnText = 'Add',
  placeholder = 'Your text',
  onPress,
  disabled,
  initialText = '',
  btnProps,
  inputProps,
  ...viewProps
}: {
  btnContent?: string | React.ReactElement | Array<React.ReactElement | string>;
  placeholder?: string;
  disabled?: boolean;
  onPress: (text: string) => void;
  initialText?: string;
  btnProps?: ButtonProps;
  inputProps?: Omit<InputProps, 'ref'>;
} & ViewProps) {
  const [text, setText] = React.useState(initialText);

  const handlePress = () => {
    setText('');
    onPress(text);
  };

  return (
    <View {...viewProps}>
      <Input
        autoFocus
        value={text}
        placeholder={placeholder}
        onChangeText={setText}
        onSubmitEditing={handlePress}
        {...inputProps}
      />
      <Box>
        <BasicButton
          disabled={!text || !!disabled}
          onPress={handlePress}
          {...btnProps}>
          {btnText}
        </BasicButton>
      </Box>
    </View>
  );
}
