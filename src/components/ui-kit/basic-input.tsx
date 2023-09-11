import React from 'react';
import {TextInput, View, ViewProps} from 'react-native';
import {BasicButton} from './basic-btn';

export function BasicInput({
  btnText,
  placeholder,
  onPress,
  disabled,
  ...viewProps
}: {
  btnText?: string;
  placeholder?: string;
  disabled?: boolean;
  onPress: (text: string) => void;
} & ViewProps) {
  const [text, setText] = React.useState('');

  return (
    <View {...viewProps}>
      <TextInput
        value={text}
        placeholder={placeholder ?? 'Your text'}
        onChangeText={setText}
      />
      <BasicButton
        disabled={!text || !!disabled}
        onPress={() => {
          setText('');
          onPress(text);
        }}
        title={btnText ?? 'Add'}
      />
    </View>
  );
}
