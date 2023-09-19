import React from 'react';
import {useDispatch} from 'react-redux';

import {deleteTodosAction} from '@store';

import Animated, {FlipInEasyX} from 'react-native-reanimated';
import {BasicButton, BasicDialog} from '../../../ui-kit';
import {DeleteDialogProps} from './types';

export function DeleteTodoDialog({
  que,
  clearQue,
  onClose,
  show,
}: DeleteDialogProps) {
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
      <Animated.Text
        entering={FlipInEasyX}>{`Do you really want to delete ${amount} ToDo${
        amount > 1 ? 's' : ''
      }?`}</Animated.Text>
    </BasicDialog>
  );
}
