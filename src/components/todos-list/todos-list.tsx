import React from 'react';
import {FlatList, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {getTodosAction, StateType} from '../../store';
import {Todo} from './todo';

export function TodosList(): JSX.Element {
  const {data, isLoading} = useSelector((state: StateType) => state.todos);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getTodosAction());
  }, [dispatch]);

  return isLoading ? (
    <Text>Loading</Text>
  ) : (
    <FlatList
      data={data}
      renderItem={({item}) => <Todo {...item} />}
      keyExtractor={item => item.id}
    />
  );
}
