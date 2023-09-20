import {Text} from '@rneui/base';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {errorTypes} from '@src/constants';
import {clearErrorsAction, clearUserErrorsAction, StateType} from '@store';

import {BasicDialog} from './ui-kit';

export function ErrorDialog() {
  const errors = useSelector((state: StateType) => state.todos.errors);
  const authErrors = useSelector((state: StateType) => state.user.errors);

  const dispatch = useDispatch();

  const activeErrors = [
    ...errors.filter(e => e.type !== errorTypes.creationError),
    ...authErrors,
  ];

  return (
    <BasicDialog
      visible={!!activeErrors.length}
      onClose={() => {
        dispatch(clearErrorsAction());
        dispatch(clearUserErrorsAction());
      }}>
      {activeErrors.map((e, i) => (
        <Text key={e.type + e.message + i}>{e.message}</Text>
      ))}
    </BasicDialog>
  );
}
