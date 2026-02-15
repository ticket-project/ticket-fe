import { useCallback, useState } from 'react';

import { GenreCode, Region, ShowsFilterState, ShowSort } from '../types';

const useShowsFilter = () => {
  const [filters, setFilters] = useState<ShowsFilterState>({
    genre: 'ALL',
    region: 'ALL',
    sort: 'popular',
  });

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
    setFilters({
      genre: 'ALL',
      region: 'ALL',
      sort: 'popular',
    });
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
