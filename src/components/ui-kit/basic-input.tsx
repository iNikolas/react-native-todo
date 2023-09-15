import React from 'react';
import {TextInput, View, ViewProps} from 'react-native';
import {BasicButton} from './basic-btn';

export function BasicInput({
  btnText,
  placeholder = 'Your text',
  onPress,
  disabled,
  initialText = '',
  ...viewProps
}: {
  btnText?: string;
  placeholder?: string;
  disabled?: boolean;
  onPress: (text: string) => void;
  initialText?: string;
} & ViewProps) {
  const [text, setText] = React.useState(initialText);

  return (
    <View {...viewProps}>
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
        title={btnText ?? 'Add'}
      />
    </View>
  );
}
