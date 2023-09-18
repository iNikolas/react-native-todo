import {CheckBox, CheckBoxProps} from '@rneui/themed';
import React from 'react';

export function BasicCheckbox({...props}: Omit<CheckBoxProps, 'children'>) {
  return <CheckBox {...props} />;
}
