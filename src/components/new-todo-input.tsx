import React from 'react';
import {Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {
  StateType,
  createNewTodoAction,
  clearCreationErrorAction,
} from '../store';

import {BasicInput} from './basic-input';
import {BasicModal} from './basic-modal';

export function NewTodoInput() {
  const {isCreating} = useSelector((state: StateType) => state.todos);

  const dispatch = useDispatch();

  return (
    <>
      <BasicInput
        disabled={isCreating}
        onPress={(description: string) =>
          dispatch(createNewTodoAction(description))
        }
      />
      <ErrorModal />
      <SuccessModal />
    </>
  );
}

function ErrorModal() {
  const {creationError} = useSelector((state: StateType) => state.todos);

  const dispatch = useDispatch();

  return (
    <BasicModal
      visible={Boolean(creationError)}
      onClose={() => dispatch(clearCreationErrorAction())}>
      <Text>{creationError}</Text>
    </BasicModal>
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
    <BasicModal visible={showModal} onClose={() => setShowModal(false)}>
      <Text>Your Todo was successfully created!</Text>
    </BasicModal>
  );
}
