'use client';

import { MenuItem, Select } from '@mui/material';
import { ConcertFilterState, Genre, Region, Sort } from '../../types';
import { REGION_OPTIONS, SORT_OPTIONS } from '../../constants';
import {
  Root,
  GenreStack,
  GenreChip,
  SelectStack,
  SelectControl,
} from './ConcertListFilter.styles';
import { useConcertGenres } from '../../hooks/useConcertQueries';

interface ConcertListFilterProps {
  filters: ConcertFilterState;
  onGenreChange?: (genre: Genre) => void;
  onRegionChange?: (region: Region) => void;
  onSortChange?: (sort: Sort) => void;
  sortType?: 'upcoming' | 'concert';
}

const ConcertListFilter = ({
  filters,
  sortType = 'concert',
  onGenreChange,
  onRegionChange,
  onSortChange,
}: ConcertListFilterProps) => {
  const { data: genres } = useConcertGenres('CONCERT');
  const genreOptions = [{ label: '전체', value: 'ALL' }, ...(genres ?? [])];
  const sortOptions = SORT_OPTIONS[sortType];

  return (
    <Root>
      {sortType === 'concert' && (
        <GenreStack direction="row" spacing={1} aria-label="장르 필터">
          {genreOptions.map((opt) => {
            const selected = filters.genre === opt.value;

            return (
              <GenreChip
                key={opt.value}
                label={opt.label}
                clickable
                onClick={() => onGenreChange?.(opt.value)}
                aria-pressed={selected}
                selected={selected}
              />
            );
          })}
        </GenreStack>
      )}

      <SelectStack direction="row" spacing={1.5}>
        <SelectControl size="small">
          <Select
            value={filters.region}
            onChange={(e) => onRegionChange?.(e.target.value)}
            displayEmpty
            inputProps={{ 'aria-label': '지역 필터' }}
          >
            {REGION_OPTIONS.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        </SelectControl>

        <SelectControl size="small">
          <Select
            value={filters.sort}
            onChange={(e) => onSortChange?.(e.target.value)}
            displayEmpty
            inputProps={{ 'aria-label': '정렬 필터' }}
          >
            {sortOptions.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        </SelectControl>
      </SelectStack>
    </Root>
  );
};

export default ConcertListFilter;
