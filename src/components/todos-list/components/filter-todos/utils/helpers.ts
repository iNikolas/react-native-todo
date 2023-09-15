import {filterTypes} from '../constants';
import {FilterTypes} from '../types';

export const handleFilterChange = (filters: FilterTypes[]) => {
  const allFilters: FilterTypes[] = Object.values(filterTypes);
  return allFilters.filter(x => !filters.includes(x));
};
