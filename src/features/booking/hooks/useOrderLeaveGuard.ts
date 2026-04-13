'use client';

import { cancelOrderInBackground } from '../api';
import useBookingLeaveGuard from './useBookingLeaveGuard';

interface UseOrderLeaveGuardProps {
  accessToken?: string | null;
  hasPendingOrder: boolean;
  onConfirmLeave: () => Promise<void>;
  orderKey?: string | null;
}

const LEAVE_CONFIRM_MESSAGE = '선점한 좌석이 해제됩니다. 이동하시겠습니까?';

const useOrderLeaveGuard = ({
  accessToken,
  hasPendingOrder,
  onConfirmLeave,
  orderKey,
}: UseOrderLeaveGuardProps) => {
  const { allowLeaveGuardExit, requestBackNavigation } = useBookingLeaveGuard({
    confirmMessage: LEAVE_CONFIRM_MESSAGE,
    hasPendingResource: hasPendingOrder,
    onConfirmLeave,
    onReleaseInBackground: async () => {
      if (!orderKey) {
        return;
      }

      await cancelOrderInBackground(orderKey, accessToken);
    },
  });

  return {
    allowOrderPageExit: allowLeaveGuardExit,
    requestBackNavigation,
  };
};

export default useOrderLeaveGuard;
