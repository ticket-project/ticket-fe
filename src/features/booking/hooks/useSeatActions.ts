import { useMemo, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

import { queryKeys } from '@/lib/queryKeys';
import { useAuthStore } from '@/store/authStore';
import { useBookingStore } from '@/store/bookingStore';

import { deselectSeat, selectSeat } from '../api';
import { PendingSeatAction, PendingSeatActionMap } from '../types';

interface UseSeatActionsProps {
  performanceId: number;
}

const useSeatActions = ({ performanceId }: UseSeatActionsProps) => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const accessToken = useAuthStore((state) => state.accessToken);
  const selectedSeatIds = useBookingStore((state) => state.selectedSeatIds);
  const addSelectedSeat = useBookingStore((state) => state.addSelectedSeat);
  const removeSelectedSeat = useBookingStore(
    (state) => state.removeSelectedSeat
  );

  const [pendingSeatActions, setPendingSeatActions] =
    useState<PendingSeatActionMap>({});

  const pendingSeatIdSet = useMemo(
    () => new Set(Object.keys(pendingSeatActions).map(Number)),
    [pendingSeatActions]
  );

  // 현재 공연의 좌석 상태 쿼리 무효화 후 최신 데이터로 다시 패치
  const invalidateSeatState = async () =>
    await queryClient.invalidateQueries({
      queryKey: queryKeys.booking.seatState(performanceId),
    });

  // 좌석 액션 실행 중 해당 좌석을 pendingSeatActions에 등록, 완료(성공/실패) 후 자동으로 제거
  const withPendingSeat = async (
    pendingAction: PendingSeatAction,
    seatId: number,
    action: () => Promise<void>
  ) => {
    setPendingSeatActions((current) => ({
      ...current,
      [seatId]: pendingAction,
    }));

    try {
      await action();
    } finally {
      setPendingSeatActions((current) => {
        const next = { ...current };
        delete next[seatId];
        return next;
      });
    }
  };

  // 좌석을 선택 - 낙관적 업데이트(store 선반영) 후 API 호출
  const handleSelectSeat = async (seatId: number) => {
    if (!accessToken) {
      enqueueSnackbar('로그인 후 좌석을 선택할 수 있습니다.', {
        variant: 'warning',
      });
      return;
    }

    await withPendingSeat('select', seatId, async () => {
      addSelectedSeat(seatId);

      try {
        await selectSeat(performanceId, seatId, accessToken);
        await invalidateSeatState();
      } catch (error) {
        removeSelectedSeat(seatId);
        console.error('좌석 선택 API 호출에 실패했습니다.', error);
        enqueueSnackbar('좌석 선택 처리 중 오류가 발생했습니다.', {
          variant: 'error',
        });
        await invalidateSeatState();
      }
    });
  };

  // 좌석 선택을 해제 - 낙관적 업데이트(store 선제거) 후 API 호출
  const handleDeselectSeat = async (seatId: number) => {
    if (!accessToken) {
      enqueueSnackbar('로그인 후 좌석 선택을 해제할 수 있습니다.', {
        variant: 'warning',
      });
      return;
    }

    await withPendingSeat('deselect', seatId, async () => {
      removeSelectedSeat(seatId);

      try {
        await deselectSeat(performanceId, seatId, accessToken);
        await invalidateSeatState();
      } catch (error) {
        addSelectedSeat(seatId);
        console.error('좌석 선택 해제 API 호출에 실패했습니다.', error);
        enqueueSnackbar('좌석 선택 해제 중 오류가 발생했습니다.', {
          variant: 'error',
        });
        await invalidateSeatState();
      }
    });
  };

  // 현재 선택된 모든 좌석 순차적으로 해제
  const handleClearSeats = async () => {
    const seatIds = [...selectedSeatIds];

    for (const seatId of seatIds) {
      await handleDeselectSeat(seatId);
    }
  };

  return {
    pendingSeatActions,
    pendingSeatIdSet,
    handleSelectSeat,
    handleDeselectSeat,
    handleClearSeats,
  };
};

export default useSeatActions;
