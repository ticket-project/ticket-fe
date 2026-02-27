import { PerformanceSummary } from '../types';

const DEFAULT_SHOW_ID = '1';

const SHOW_SUMMARY_MOCK: Record<string, PerformanceSummary> = {
  '1': {
    performanceId: '1',
    title: '오페라의 유령',
    region: '서울',
    performanceDate: '2026-03-19',
    grades: [
      { id: '1', name: 'VIP', price: 170000 },
      { id: '2', name: 'S', price: 140000 },
      { id: '3', name: 'R', price: 110000 },
      { id: '4', name: 'A', price: 90000 },
    ],
  },
};

export const makePerformanceSummaryMock = (
  performanceId: string
): PerformanceSummary => {
  return SHOW_SUMMARY_MOCK[performanceId] ?? SHOW_SUMMARY_MOCK[DEFAULT_SHOW_ID];
};
