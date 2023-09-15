import React from 'react';
import {Text, View} from 'react-native';

import {BasicCheckbox} from '../../../ui-kit';
import {filterTypes} from './constants';
import {FilterTypes} from './types';

export function FilterTodos({
  onFilterChange,
  done,
  undone,
}: {
  done: boolean;
  undone: boolean;
  onFilterChange: (filterType: FilterTypes[]) => void;
}) {
  const handleCheckboxChange = (type: FilterTypes) => (checked: boolean) => {
    const filters: FilterTypes[] = [];

    if (
      (checked && type === filterTypes.done) ||
      (!(type === filterTypes.done) && done)
    ) {
      filters.push(filterTypes.done);
    }

    if (
      (checked && type === filterTypes.undone) ||
      (!(type === filterTypes.undone) && undone)
    ) {
      filters.push(filterTypes.undone);
    }

    const allFilters: FilterTypes[] = Object.values(filterTypes);

    onFilterChange(allFilters.filter(x => !filters.includes(x)));
  };

  return (
    <View>
      <Text>Show</Text>
      <View>
        <Text>done: </Text>
        <BasicCheckbox
          value={done}
          onValueChange={handleCheckboxChange(filterTypes.done)}
        />
      </View>
      <View>
        <Text>undone: </Text>
        <BasicCheckbox
          value={undone}
          onValueChange={handleCheckboxChange(filterTypes.undone)}
        />
      </View>
    </View>
  );
}
