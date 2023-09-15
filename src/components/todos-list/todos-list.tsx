import React from 'react';
import {FlatList, Text, TouchableHighlight, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {editTodosAction, getTodosAction, StateType, TodoType} from '@store';
import {EditTodoTableType} from '@types';

import {useFocusEffect} from '@react-navigation/native';
import {BasicButton} from '../ui-kit';
import {DeleteTodoDialog, FilterTodos, Todo} from './components';
import {filterTypes} from './components/filter-todos/constants';
import {FilterTypes} from './components/filter-todos/types';
import {updateType} from './constants';
import {UpdateType} from './types';

export function TodosList(): JSX.Element {
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
      {showCheckboxes && (
        <View>
          <BasicButton title="Cancel" onPress={handleCancelSelection} />
          <BasicButton
            disabled={selectedIds.size === 0 || isDeleting}
            title={isDeleting ? 'Deleting...' : 'Delete'}
            onPress={() => setShowDeleteDialog(true)}
          />
          <BasicButton
            disabled={selectedIds.size === 0 || isUpdating}
            title={
              isUpdating
                ? 'Updating...'
                : `Mark ${selectedIds.size > 1 ? ' all' : ''} Done`
            }
            onPress={handleUpdate(updateType.done)}
          />
          <BasicButton
            disabled={selectedIds.size === 0 || isUpdating}
            title={
              isUpdating
                ? 'Updating...'
                : `Mark ${selectedIds.size > 1 ? ' all' : ''} Undone`
            }
            onPress={handleUpdate(updateType.undone)}
          />
        </View>
      )}
      {!showCheckboxes && (
        <FilterTodos
          done={!filters.includes(filterTypes.done)}
          undone={!filters.includes(filterTypes.undone)}
          onFilterChange={setFilters}
        />
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
              onSelectionChange={(isSelected: boolean) =>
                setSelectedIds(
                  prevSelected =>
                    new Set(
                      isSelected
                        ? [...prevSelected, item.id]
                        : [...prevSelected].filter(id => id !== item.id),
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
