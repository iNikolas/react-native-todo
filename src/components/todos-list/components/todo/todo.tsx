import React from 'react';
import {Text, View} from 'react-native';

import {TodoType} from '@store';

import {BasicCheckbox} from '../../../ui-kit';
import {EditableDescriptionField} from './components';
import {TodoListProps} from './types';

export function Todo({
  description,
  isDone,
  created,
  selected,
  onSelectionChange,
  showCheckboxes,
  editable,
  id,
  onFinishEditing,
}: TodoType & TodoListProps) {
  return (
    <View>
      {showCheckboxes && (
        <BasicCheckbox value={selected} onValueChange={onSelectionChange} />
      )}
      <Text>{created}</Text>
      {editable ? (
        <EditableDescriptionField
          onFinishEditing={onFinishEditing}
          initialText={description}
          id={id}
        />
      ) : (
        <Text>{description}</Text>
      )}
      <Text>{isDone ? 'Done' : 'Not Done'}</Text>
    </View>
  );
}
