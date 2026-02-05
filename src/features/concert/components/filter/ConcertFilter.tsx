'use client';

import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';

// constants 분리
const GENRE_OPTIONS = [
  { label: '전체', value: 'all' },
  { label: '발라드', value: 'ballad' },
  { label: '힙합', value: 'hiphop' },
  { label: '재즈', value: 'jazz' },
  { label: '인디', value: 'indie' },
];

const SORT_OPTIONS = [
  { label: '인기순', value: 'popular' },
  { label: '최신순', value: 'latest' },
  { label: '공연임박순', value: 'upcoming' },
];

const REGION_OPTIONS = [
  { label: '전체', value: 'all' },
  { label: '서울', value: 'seoul' },
  { label: '부산', value: 'busan' },
  { label: '대구', value: 'daegu' },
  { label: '인천', value: 'incheon' },
];

// type Genre = 'ALL' | 'BALLAD' | 'HIPHOP' | 'JAZZ' | 'INDIE';
// type Region = 'ALL' | 'SEOUL' | 'GYEONGGI' | 'BUSAN' | 'DAEGU';
// type Sort = 'POPULAR' | 'LATEST' | 'OPEN_SOON';

const ConcertFilter = () => {
  const [genre, setGenre] = useState('all');
  const [region, setRegion] = useState('all');
  const [sort, setSort] = useState('popular');

  const handleGenreClick = (next) => () => setGenre(next);

  const handleRegionChange = (e: SelectChangeEvent) => {
    setRegion(e.target.value);
  };

  const handleSortChange = (e: SelectChangeEvent) => {
    setSort(e.target.value);
  };
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
      {/* 장르 필터 (왼쪽) */}
      <Stack
        direction="row"
        spacing={1}
        role="tablist"
        aria-label="장르 필터"
        sx={{
          flexWrap: 'wrap',
          rowGap: 1,
        }}
      >
        {GENRE_OPTIONS.map((opt) => {
          const selected = genre === opt.value;
          return (
            <Chip
              key={opt.value}
              label={opt.label}
              clickable
              onClick={handleGenreClick(opt.value)}
              // role="tab"
              // aria-selected={selected}
              // tabIndex={selected ? 0 : -1}
              // variant={selected ? 'filled' : 'outlined'}
              // color={selected ? 'primary' : 'default'}
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

      {/* 우측 드롭다운 2개 */}
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
            labelId="region-select-label"
            id="region-select"
            value={region}
            label="모든 지역"
            onChange={handleRegionChange}
            aria-label="지역 선택"
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
            labelId="sort-select-label"
            id="sort-select"
            value={sort}
            label="인기순"
            onChange={handleSortChange}
            aria-label="정렬 선택"
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

export default ConcertFilter;
