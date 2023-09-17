import React from 'react';
import {useDispatch} from 'react-redux';
import {styled} from 'styled-components/native';

import {editTodosAction} from '@store';

import {BasicInput} from '../../../../ui-kit';

const Input = styled(BasicInput)`
  display: flex;
  flex-direction: row;
`;

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
    <Input
      btnText="OK"
      initialText={initialText}
      onPress={handleUpdateDescription}
    />
  );
}
