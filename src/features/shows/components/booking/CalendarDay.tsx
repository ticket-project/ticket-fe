import { PickersDayProps } from '@mui/x-date-pickers';

import { BaseDay, SundayDay } from './BookingPanel.styles';

interface CalendarDayProps extends PickersDayProps {
  availableDateSet?: Set<string>;
}

const CalendarDay = (props: CalendarDayProps) => {
  const { day, outsideCurrentMonth, availableDateSet, ...other } = props;

  const dateStr = day.format('YYYY-MM-DD');
  const isAvailable = availableDateSet?.has(dateStr);
  const isSunday = day.day() === 0 && !outsideCurrentMonth;

  const DayComponent = isSunday ? SundayDay : BaseDay;

  return (
    <DayComponent
      {...other}
      day={day}
      outsideCurrentMonth={outsideCurrentMonth}
      disabled={!isAvailable || outsideCurrentMonth}
    />
  );
};

export default CalendarDay;
