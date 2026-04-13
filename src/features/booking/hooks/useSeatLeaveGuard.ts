'use client';

import { deselectAllSeatsInBackground } from '../api';
import useBookingLeaveGuard from './useBookingLeaveGuard';

interface UseSeatLeaveGuardProps {
  accessToken?: string | null;
  hasSelectedSeats: boolean;
  onConfirmLeave: () => Promise<void>;
  performanceId: number;
}

const LEAVE_CONFIRM_MESSAGE = '선택한 좌석이 해제됩니다. 이동하시겠습니까?';

const useSeatLeaveGuard = ({
  accessToken,
  hasSelectedSeats,
  onConfirmLeave,
  performanceId,
}: UseSeatLeaveGuardProps) => {
  const { allowLeaveGuardExit, requestBackNavigation } = useBookingLeaveGuard({
    confirmMessage: LEAVE_CONFIRM_MESSAGE,
    hasPendingResource: hasSelectedSeats,
    onConfirmLeave,
    onReleaseInBackground: async () => {
      await deselectAllSeatsInBackground(performanceId, accessToken);
    },
  });

  return {
    allowSeatPageExit: allowLeaveGuardExit,
    requestBackNavigation,
  };
};

export default useSeatLeaveGuard;
