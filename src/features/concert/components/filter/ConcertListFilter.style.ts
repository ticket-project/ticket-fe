import { Box, Chip, FormControl, Stack, styled } from '@mui/material';

export const Root = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  justifyContent: 'space-between',
  flexDirection: 'row',
  [theme.breakpoints.down('md')]: {
    alignItems: 'stretch',
    flexDirection: 'column',
  },
}));

export const GenreStack = styled(Stack)(({ theme }) => ({
  flexWrap: 'wrap',
  rowGap: theme.spacing(1),
}));

export const GenreChip = styled(Chip)<{ selected?: boolean }>(
  ({ selected, theme }) => ({
    fontSize: '1.5rem',
    fontWeight: 800,
    borderRadius: 999,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(2.5),
    paddingBottom: theme.spacing(2.5),
    backgroundColor: selected
      ? theme.palette.primary.main
      : theme.palette.grey[100],
    color: selected ? 'white' : theme.palette.text.primary,
    '&:hover': {
      backgroundColor: selected
        ? theme.palette.primary.main
        : theme.palette.grey[200],
    },
  })
);

export const SelectStack = styled(Stack)(({ theme }) => ({
  justifyContent: 'flex-end',
  flexWrap: 'wrap',
  rowGap: theme.spacing(1),
  [theme.breakpoints.down('md')]: {
    justifyContent: 'flex-start',
  },
}));

export const SelectControl = styled(FormControl)(() => ({
  minWidth: 120,
}));
