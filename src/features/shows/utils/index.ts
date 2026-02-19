import dayjs, { Dayjs } from 'dayjs';

import { Performances } from '../types';

export const toDateKey = (date: Dayjs) => date.format('YYYY-MM-DD');

export const getFirstSessionId = (
  performances: Performances,
  dateKey: string
) => {
  return performances[dateKey]?.[0]?.sessionId ?? null;
};

export const getInitialDateState = (performances: Performances) => {
  const today = dayjs().startOf('day');

  const dateKeys = Object.keys(performances).sort(
    (a, b) => dayjs(a).valueOf() - dayjs(b).valueOf()
  );

  const dateSet = new Set(dateKeys);
  const defaultDateKey =
    dateKeys.find((dateKey) => !dayjs(dateKey).isBefore(today)) ?? dateKeys[0];
  return {
    availableDateSet: dateSet,
    initialSelectedDate: defaultDateKey ? dayjs(defaultDateKey) : dayjs(),
  };
};
