import {useTheme} from '@rneui/themed';
import React from 'react';
import {Text} from 'react-native';
import {useDispatch} from 'react-redux';

import {deleteTodosAction} from '@store';

import {BasicButton, BasicDialog} from '../../../ui-kit';
import {DeleteDialogProps} from './types';

export function DeleteTodoDialog({
  que,
  clearQue,
  onClose,
  show,
}: DeleteDialogProps) {
  const {theme} = useTheme();
  const amount = que.length;

  const dispatch = useDispatch();

  const handleDeletion = () => {
    dispatch(deleteTodosAction(que));
    clearQue();
    onClose();
  };
  return (
    <BasicDialog
      closeDialogBtnText="Cancel"
      extraBtns={
        <BasicButton color="error" onPress={handleDeletion} title={'Delete'} />
      }
      onClose={onClose}
      visible={show}>
      <Text>{`Do you really want to delete ${amount} ToDo${
        amount > 1 ? 's' : ''
      }?`}</Text>
    </BasicDialog>
  );
}
