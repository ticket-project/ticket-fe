import type { Performances } from '../../types';

export const performances: Performances = {
  '2026-03-05': [
    { sessionId: 1, time: '2026-03-05T14:00:00', status: 'OPEN' },
    { sessionId: 2, time: '2026-03-05T19:00:00', status: 'OPEN' },
  ],
  '2026-03-06': [{ sessionId: 3, time: '2026-03-06T19:00:00', status: 'OPEN' }],
  '2026-03-07': [
    { sessionId: 1, time: '2026-03-07T14:00:00', status: 'OPEN' },
    { sessionId: 2, time: '2026-03-07T19:00:00', status: 'OPEN' },
    { sessionId: 3, time: '2026-03-07T21:00:00', status: 'OPEN' },
  ],
};
