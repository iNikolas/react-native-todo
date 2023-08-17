import React from 'react';
import {Button, TextInput, View} from 'react-native';

export function BasicInput({
  btnText,
  placeholder,
  onPress,
}: {
  btnText?: string;
  placeholder?: string;
  onPress: (text: string) => void;
}) {
  const [text, setText] = React.useState('');

  return (
    <View>
      <TextInput
        value={text}
        placeholder={placeholder ?? 'Your text'}
        onChangeText={setText}
      />
      <Button
        disabled={!text}
        onPress={() => {
          setText('');
          onPress(text);
        }}
        title={btnText ?? 'Add'}
      />
    </View>
  );
}
