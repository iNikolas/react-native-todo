import React from 'react';
import {useDispatch} from 'react-redux';

import {editTodosAction} from '@store';

import {BasicInput} from '../../../../ui-kit';

export function EditableDescriptionField({
  initialText,
  id,
  onFinishEditing,
}: {
  initialText: string;
  id: string;
  onFinishEditing: () => void;
}) {
  const dispatch = useDispatch();

  const handleUpdateDescription = (description: string) => {
    if (description !== initialText) {
      dispatch(editTodosAction({[id]: {id, description}}));
    }
    onFinishEditing();
  };

  return (
    <BasicInput
      btnText="OK"
      initialText={initialText}
      onPress={handleUpdateDescription}
    />
  );
}
