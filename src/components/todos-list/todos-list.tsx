import {useFocusEffect} from '@react-navigation/native';
import {Stack} from '@rneui/layout';
import {useTheme} from '@rneui/themed';
import React from 'react';
import {FlatList, Text, TouchableHighlight} from 'react-native';
import Animated, {StretchInX, ZoomIn, ZoomOut} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';

import {routes} from '@src/app/router';
import {editTodosAction, getTodosAction, StateType, TodoType} from '@store';
import {EditTodoTableType} from '@types';

import {NavigateBtn} from '../navigate-btn';
import {BasicButton, BasicIcon} from '../ui-kit';
import {DeleteTodoDialog, FilterTodos, Todo} from './components';
import {filterTypes} from './components/filter-todos/constants';
import {FilterTypes} from './components/filter-todos/types';
import {updateType} from './constants';
import {UpdateType} from './types';

const AnimatedView = ({
  children,
}: {
  children: React.ReactElement | React.ReactElement[];
}) => <Animated.View entering={StretchInX}>{children}</Animated.View>;

export function TodosList(): JSX.Element {
  const {theme} = useTheme();

  const {data, isLoading, isDeleting, isUpdating} = useSelector(
    (state: StateType) => state.todos,
  );

  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set());
  const [filters, setFilters] = React.useState<FilterTypes[]>([]);
  const [todos, setTodos] = React.useState(data);

  const [showCheckboxes, setShowCheckboxes] = React.useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const [editableTodoId, setEditableTodoId] = React.useState('');

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!data) {
      return setTodos(data);
    }

    if (showCheckboxes) {
      return setTodos(prevTodos =>
        prevTodos
          ? data.filter(entry => prevTodos.some(prev => entry.id === prev.id))
          : prevTodos,
      );
    }

    const result: {value: TodoType[]} = {value: data};

    if (filters.includes(filterTypes.done)) {
      result.value = result.value.filter(entry => !entry.isDone);
    }

    if (filters.includes(filterTypes.undone)) {
      result.value = result.value.filter(entry => entry.isDone);
    }

    setTodos(result.value);
  }, [data, filters, showCheckboxes]);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setFilters([]);
      };
    }, []),
  );

  const handleSelectTodo = (id: string) =>
    setSelectedIds(
      prevSelected =>
        new Set(
          prevSelected.has(id)
            ? [...prevSelected].filter(pId => pId !== id)
            : [...prevSelected, id],
        ),
    );

  const handleItemPress = (id: string) => {
    if (showCheckboxes) {
      return handleSelectTodo(id);
    }

    setEditableTodoId(prevState => (prevState === id ? '' : id));
  };

  const handleItemLongPress = (id: string) => {
    setShowCheckboxes(true);
    setEditableTodoId('');
    handleSelectTodo(id);
  };

  const handleCancelSelection = () => {
    setSelectedIds(new Set());
    setShowCheckboxes(false);
  };

  const handleUpdate = (type: UpdateType) => () => {
    const result: {value: EditTodoTableType} = {value: {}};
    const selectedItems = [...selectedIds];

    if (type === updateType.done || type === updateType.undone) {
      result.value = {
        ...result.value,
        ...selectedItems.reduce<EditTodoTableType>(
          (acc, id) => ({...acc, [id]: {id, isDone: type === updateType.done}}),
          {},
        ),
      };
    }

    dispatch(editTodosAction(result.value));
  };

  React.useEffect(() => {
    dispatch(getTodosAction());
  }, [dispatch]);

  return isLoading ? (
    <Text>Loading</Text>
  ) : (
    <>
      {!showCheckboxes && (
        <Animated.View entering={ZoomIn} exiting={ZoomOut}>
          <NavigateBtn screen={routes.createTodo}>
            New
            <BasicIcon
              name="create"
              type="ionicon"
              color={theme.colors.primary}
            />
          </NavigateBtn>
        </Animated.View>
      )}
      {showCheckboxes && (
        <AnimatedView>
          <Stack row align="center" justify="space-around" spacing={1}>
            <BasicButton type="clear" onPress={handleCancelSelection}>
              <BasicIcon name="back" type="entypo" />
            </BasicButton>
            <BasicButton
              type="clear"
              disabled={selectedIds.size === 0 || isDeleting}
              loading={isDeleting}
              onPress={() => setShowDeleteDialog(true)}>
              <BasicIcon
                {...(selectedIds.size === 0 && {color: theme.colors.disabled})}
                name="delete"
              />
            </BasicButton>
            <BasicButton
              type="clear"
              disabled={selectedIds.size === 0 || isUpdating}
              loading={isUpdating}
              onPress={handleUpdate(updateType.undone)}>
              <BasicIcon
                color={
                  selectedIds.size === 0
                    ? theme.colors.disabled
                    : theme.colors.warning
                }
                name="remove-done"
              />
            </BasicButton>
            <BasicButton
              type="clear"
              disabled={selectedIds.size === 0 || isUpdating}
              loading={isUpdating}
              onPress={handleUpdate(updateType.done)}>
              <BasicIcon
                color={
                  selectedIds.size === 0
                    ? theme.colors.disabled
                    : theme.colors.success
                }
                name={selectedIds.size > 1 ? 'checkmark-done' : 'checkmark'}
                type="ionicon"
              />
            </BasicButton>
          </Stack>
        </AnimatedView>
      )}
      {!showCheckboxes && (
        <AnimatedView>
          <FilterTodos
            done={!filters.includes(filterTypes.done)}
            undone={!filters.includes(filterTypes.undone)}
            onFilterChange={setFilters}
          />
        </AnimatedView>
      )}
      <FlatList
        data={todos}
        renderItem={({item}) => (
          <TouchableHighlight
            onPress={() => handleItemPress(item.id)}
            onLongPress={() => handleItemLongPress(item.id)}>
            <Todo
              {...item}
              editable={item.id === editableTodoId}
              onFinishEditing={() => setEditableTodoId('')}
              selected={selectedIds.has(item.id)}
              showCheckboxes={showCheckboxes}
              onSelectionChange={() =>
                setSelectedIds(
                  prevSelected =>
                    new Set(
                      prevSelected.has(item.id)
                        ? [...prevSelected].filter(id => id !== item.id)
                        : [...prevSelected, item.id],
                    ),
                )
              }
            />
          </TouchableHighlight>
        )}
        keyExtractor={item => item.id}
      />
      <DeleteTodoDialog
        show={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        que={[...selectedIds]}
        clearQue={handleCancelSelection}
      />
    </>
  );
}
