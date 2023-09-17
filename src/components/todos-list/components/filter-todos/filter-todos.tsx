import {Stack} from '@rneui/layout';
import React from 'react';
import {Text} from 'react-native';
import styled from 'styled-components/native';

import {BasicCheckbox} from '../../../ui-kit';
import {filterTypes} from './constants';
import {FilterTypes} from './types';

const StyledStack = styled(Stack)`
  padding: 0 4px 4px 4px;
`;

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
    <StyledStack row align="center" justify="flex-end" spacing={1}>
      <Text>Show:</Text>
      <Stack row align="center" spacing={1}>
        <Text>done</Text>
        <BasicCheckbox
          value={done}
          onValueChange={handleCheckboxChange(filterTypes.done)}
        />
      </Stack>
      <Stack row align="center" spacing={1}>
        <Text>undone</Text>
        <BasicCheckbox
          value={undone}
          onValueChange={handleCheckboxChange(filterTypes.undone)}
        />
      </Stack>
    </StyledStack>
  );
}
