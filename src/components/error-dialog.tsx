import {Text} from '@rneui/base';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {errorTypes} from '@src/constants';
import {clearErrorsAction, StateType} from '@store';

import {BasicDialog} from './ui-kit';

export function ErrorDialog() {
  const {errors} = useSelector((state: StateType) => state.todos);

  const dispatch = useDispatch();

  const activeErrors = errors.filter(e => e.type !== errorTypes.creationError);

  return (
    <BasicDialog
      visible={!!activeErrors.length}
      onClose={() => dispatch(clearErrorsAction())}>
      {activeErrors.map(e => (
        <Text>{e.message}</Text>
      ))}
    </BasicDialog>
  );
}
