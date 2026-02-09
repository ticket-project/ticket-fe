import { Box, Chip, FormControl, Stack, styled } from '@mui/material';

export const Root = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  gap: theme.spacing(2),
  justifyContent: 'space-between',
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
    paddingBottom: theme.spacing(2.5),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(2.5),
    color: selected ? 'white' : theme.palette.text.primary,
    fontSize: '1.5rem',
    fontWeight: 800,
    backgroundColor: selected
      ? theme.palette.primary.main
      : theme.palette.grey[100],
    borderRadius: 999,
    '&:hover': {
      backgroundColor: selected
        ? theme.palette.primary.main
        : theme.palette.grey[200],
    },
  })
);

export const SelectStack = styled(Stack)(({ theme }) => ({
  justifyContent: 'flex-end',
  [theme.breakpoints.down('md')]: {
    justifyContent: 'flex-start',
  },
  flexWrap: 'wrap',
  rowGap: theme.spacing(1),
}));

export const SelectControl = styled(FormControl)(() => ({
  minWidth: 120,
}));
