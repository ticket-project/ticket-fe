'use client';

import { MenuItem, Select } from '@mui/material';

import {
  ShowsFilterState,
  Region,
  UpcomingShowsFilterState,
  UpcomingSort,
  ShowSort,
  GenreCode,
} from '../../types';

import { REGION_OPTIONS, SORT_OPTIONS } from '../../constants';
import { useShowGenres } from '../../hooks/useShowQueries';

import {
  Root,
  GenreStack,
  GenreChip,
  SelectStack,
  SelectControl,
} from './ShowListFilter.styles';

interface ShowListFilterProps {
  filters: ShowsFilterState | UpcomingShowsFilterState;
  onGenreChange?: (genre: GenreCode) => void;
  onRegionChange?: (region: Region) => void;
  onSortChange?: (sort: ShowSort | UpcomingSort) => void;
  sortType?: 'upcoming' | 'show';
}

const ShowListFilter = ({
  filters,
  sortType = 'show',
  onGenreChange,
  onRegionChange,
  onSortChange,
}: ShowListFilterProps) => {
  const { data: genres } = useShowGenres('CONCERT');
  const genreOptions = [{ label: '전체', value: 'ALL' }, ...(genres ?? [])];
  const sortOptions = SORT_OPTIONS[sortType];

  return (
    <Root>
      {sortType === 'show' && (
        <GenreStack direction="row" spacing={1} aria-label="장르 필터">
          {genreOptions.map((opt) => {
            const selected = (filters as ShowsFilterState).genre === opt.value;

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

export default ShowListFilter;
