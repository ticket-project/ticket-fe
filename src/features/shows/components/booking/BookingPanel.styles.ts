import { Box, Button, Paper, Stack, styled } from '@mui/material';
import { DateCalendar, PickersDay } from '@mui/x-date-pickers';

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2.5),
  border: '1px solid',
  borderColor: theme.palette.grey[200],
  borderRadius: 10,
}));

export const CalendarBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  border: '1px solid',
  borderColor: theme.palette.grey[200],
  borderRadius: 6,
}));

export const Calendar = styled(DateCalendar)({
  height: 'auto',
  width: '100%',
  '& .MuiDayCalendar-header': {
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    borderRadius: 100,
  },
  '& .MuiDayCalendar-weekDayLabel': {
    fontWeight: 600,
    color: 'inherit',
  },
  '& .MuiPickersSlideTransition-root': {
    minHeight: '230px',
  },
});

export const SessionGrid = styled(Stack)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(1),
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
}));

export const SessionButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== '$selected',
})<{ $selected: boolean }>(({ $selected, theme }) => ({
  paddingBottom: theme.spacing(1),
  paddingTop: theme.spacing(1),
  fontSize: '1.3rem',
  fontWeight: $selected ? 700 : 400,
  textTransform: 'none',
  color: $selected ? theme.palette.primary.main : theme.palette.grey[600],
  backgroundColor: $selected
    ? theme.palette.primary.light
    : theme.palette.common.white,
  borderColor: $selected ? theme.palette.primary.main : theme.palette.grey[200],
}));

export const BookButton = styled(Button)(({ theme }) => ({
  paddingBottom: theme.spacing(1.5),
  paddingTop: theme.spacing(1.5),
  fontSize: '1.6rem',
  fontWeight: 700,
  color: theme.palette.common.white,
  backgroundColor: theme.palette.primary.main,
  '&:hover': { backgroundColor: theme.palette.primary.dark },
}));

export const ForeignBookButton = styled(Button)(({ theme }) => ({
  paddingBottom: theme.spacing(1.5),
  paddingTop: theme.spacing(1.5),
  fontSize: '1.6rem',
  fontWeight: 700,
  color: theme.palette.primary.main,
  borderColor: theme.palette.primary.main,
  '&:hover': { backgroundColor: theme.palette.primary.light },
}));

export const BaseDay = styled(PickersDay)({
  fontSize: '1.3rem',
  fontWeight: 700,
  '&.MuiPickersDay-root.Mui-disabled': {
    color: 'rgba(0, 0, 0, 0.25)',
  },
});

export const SundayDay = styled(BaseDay)({
  '&.MuiPickersDay-root.Mui-disabled': {
    color: 'rgba(255, 0, 0, 0.38) !important',
  },
  '&:not(.Mui-disabled)': {
    color: '#d32f2f',
  },
});
