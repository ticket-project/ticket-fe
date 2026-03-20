import { useCallback, useState } from 'react';

import { DEFAULT_SHOWS_FILTERS } from '../constants/defaultFilters';
import { GenreCode, Region, ShowsFilterState, ShowSort } from '../types';

const useShowsFilter = () => {
  const [filters, setFilters] = useState<ShowsFilterState>(
    DEFAULT_SHOWS_FILTERS
  );

  const setGenre = useCallback((genre: GenreCode) => {
    setFilters((prev) => ({ ...prev, genre }));
  }, []);

  const setRegion = useCallback((region: Region) => {
    setFilters((prev) => ({ ...prev, region }));
  }, []);

  const setSort = useCallback((sort: ShowSort) => {
    setFilters((prev) => ({ ...prev, sort }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_SHOWS_FILTERS);
  }, []);

  return {
    filters,
    setGenre,
    setRegion,
    setSort,
    resetFilters,
  };
};

export default useShowsFilter;
