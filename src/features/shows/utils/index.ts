import dayjs, { Dayjs } from 'dayjs';

import { Performances } from '../types';

const DATE_KEY_FORMAT = 'YYYY-MM-DD';

export const toDateKey = (date: Dayjs) => date.format(DATE_KEY_FORMAT);

// 특정 날짜의 회차들
export const getSessionsByDateKey = (
  performanceDates: Performances[],
  dateKey: string
) => {
  const matchedDate = performanceDates.find((item) => item.date === dateKey);
  const sessions = matchedDate?.performances ?? [];

  return sessions;
};

// 기본으로 선택할 회차(첫번째 회차)
export const getFirstSessionId = (
  performanceDates: Performances[],
  dateKey: string
) => {
  const sessions = getSessionsByDateKey(performanceDates, dateKey);
  const firstSessionId = sessions?.[0]?.id ?? null;

  return firstSessionId;
};

// 초기 선택 날짜 및 회차
export const getInitialDateState = (performanceDates: Performances[]) => {
  const dateKeys = performanceDates
    .map((pd) => pd.date)
    .sort((a, b) => a.localeCompare(b));

  const todayKey = dayjs().startOf('day').format(DATE_KEY_FORMAT);
  const defaultDateKey = dateKeys.find((k) => k >= todayKey) ?? dateKeys[0];

  const availableDateSet = new Set(dateKeys);
  const initialSelectedDate = defaultDateKey ? dayjs(defaultDateKey) : null;
  const initialSelectedSessionId = getFirstSessionId(
    performanceDates,
    defaultDateKey
  );

  return {
    availableDateSet,
    initialSelectedDate,
    initialSelectedSessionId,
  };
};
