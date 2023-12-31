import React from 'react';
import {Text} from 'react-native';
import Animated, {BounceIn} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';

import {errorTypes} from '@constants';

import {
  clearCreationErrorAction,
  createNewTodoAction,
  StateType,
} from '../store';

import {BasicDialog, BasicInput} from './ui-kit';

export function NewTodoInput() {
  const {isCreating} = useSelector((state: StateType) => state.todos);

  const dispatch = useDispatch();

  return (
    <>
      <Animated.View entering={BounceIn}>
        <BasicInput
          btnProps={{loading: isCreating}}
          disabled={isCreating}
          onPress={(description: string) =>
            dispatch(createNewTodoAction(description))
          }
        />
      </Animated.View>
      <ErrorModal />
      <SuccessModal />
    </>
  );
}

function ErrorModal() {
  const {errors} = useSelector((state: StateType) => state.todos);

  const creationError = errors.find(e => e.type === errorTypes.creationError);

  const dispatch = useDispatch();

  return (
    <BasicDialog
      visible={Boolean(creationError)}
      onClose={() => dispatch(clearCreationErrorAction())}>
      <Text>{creationError?.message}</Text>
    </BasicDialog>
  );
}

function SuccessModal() {
  const [showModal, setShowModal] = React.useState(false);

  const {isCreating, data} = useSelector((state: StateType) => state.todos);

  const todosListLength = data?.length ?? 0;
  const prevTodosListLengthRef = React.useRef(todosListLength);

  React.useEffect(() => {
    if (!isCreating && todosListLength > prevTodosListLengthRef.current) {
      setShowModal(true);
    }
    prevTodosListLengthRef.current = todosListLength;
  }, [isCreating, todosListLength]);

  return (
    <BasicDialog visible={showModal} onClose={() => setShowModal(false)}>
      <Text>Your Todo was successfully created!</Text>
    </BasicDialog>
  );
}
