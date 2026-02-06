'use client';

import { Box, Chip, FormControl, MenuItem, Select, Stack } from '@mui/material';
import { ConcertFilterState, Genre, Region, Sort } from '../../types';
import { GENRE_OPTIONS, REGION_OPTIONS, SORT_OPTIONS } from '../../constants';

interface ConcertListFilterProps {
  filters: ConcertFilterState;
  onGenreChange: (genre: Genre) => void;
  onRegionChange: (region: Region) => void;
  onSortChange: (sort: Sort) => void;
}

const ConcertListFilter = ({
  filters,
  onGenreChange,
  onRegionChange,
  onSortChange,
}: ConcertListFilterProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: { xs: 'stretch', md: 'center' },
        gap: 2,
        justifyContent: 'space-between',
        flexDirection: { xs: 'column', md: 'row' },
      }}
    >
      {/* 장르 필터 버튼 그룹 */}
      <Stack
        direction="row"
        spacing={1}
        aria-label="장르 필터"
        sx={{ flexWrap: 'wrap', rowGap: 1 }}
      >
        {GENRE_OPTIONS.map((opt) => {
          const selected = filters.genre === opt.value;

          return (
            <Chip
              key={opt.value}
              label={opt.label}
              clickable
              onClick={() => onGenreChange(opt.value)}
              aria-pressed={selected}
              sx={{
                fontSize: '1.5rem',
                fontWeight: 800,
                borderRadius: 999,
                px: 2,
                py: 2.5,
                bgcolor: selected ? 'primary.main' : 'grey.100',
                color: selected ? 'white' : 'black',
                '&:hover': {
                  bgcolor: selected ? 'primary.main' : 'grey.200',
                },
              }}
            />
          );
        })}
      </Stack>

      <Stack
        direction="row"
        spacing={1.5}
        sx={{
          justifyContent: { xs: 'flex-start', md: 'flex-end' },
          flexWrap: 'wrap',
          rowGap: 1,
        }}
      >
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <Select
            id="region-select"
            value={filters.region}
            onChange={(e) => onRegionChange(e.target.value as Region)}
            displayEmpty
            inputProps={{ 'aria-label': '지역 필터' }}
          >
            {REGION_OPTIONS.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <Select
            id="sort-select"
            value={filters.sort}
            onChange={(e) => onSortChange(e.target.value as Sort)}
            displayEmpty
            inputProps={{ 'aria-label': '정렬 필터' }}
          >
            {SORT_OPTIONS.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </Box>
  );
};

export default ConcertListFilter;
