import { useCallback, useState } from 'react';

import { ConcertFilterState, Genre, Region, Sort } from '../types';

const useConcertListFilter = () => {
  const [filters, setFilters] = useState<ConcertFilterState>({
    genre: 'ALL',
    region: 'ALL',
    sort: 'popular',
  });

  const setGenre = useCallback((genre: Genre) => {
    setFilters((prev) => ({ ...prev, genre }));
  }, []);

  const setRegion = useCallback((region: Region) => {
    setFilters((prev) => ({ ...prev, region }));
  }, []);

  const setSort = useCallback((sort: Sort) => {
    setFilters((prev) => ({ ...prev, sort }));
  }, []);

  const resetFilter = useCallback(() => {
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
    resetFilter,
  };
};

export default useConcertListFilter;
