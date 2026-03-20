import { useMemo, useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

import { queryKeys } from '@/lib/queryKeys';
import { useAuthStore } from '@/store/authStore';
import { useBookingStore } from '@/store/bookingStore';

import { deselectAllSeats, deselectSeat, selectSeat } from '../api';
import {
  getSeatStateAuthScope,
  updateSeatStateCache,
  updateSeatStatesCache,
} from '../lib/seatStateCache';
import { PendingSeatAction, PendingSeatActionMap, SeatState } from '../types';

interface UseSeatActionsProps {
  performanceId: number;
}

const useSeatActions = ({ performanceId }: UseSeatActionsProps) => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const accessToken = useAuthStore((state) => state.accessToken);
  const authScope = getSeatStateAuthScope(accessToken);
  const selectedSeatIds = useBookingStore((state) => state.selectedSeatIds);
  const setSelectedSeatIds = useBookingStore(
    (state) => state.setSelectedSeatIds
  );
  const addSelectedSeat = useBookingStore((state) => state.addSelectedSeat);
  const removeSelectedSeat = useBookingStore(
    (state) => state.removeSelectedSeat
  );
  const seatStateQueryKey = queryKeys.booking.seatState(
    performanceId,
    authScope
  );

  const [pendingSeatActions, setPendingSeatActionsState] =
    useState<PendingSeatActionMap>({});

  const pendingSeatIdSet = useMemo(
    () => new Set(Object.keys(pendingSeatActions).map(Number)),
    [pendingSeatActions]
  );

  const setPendingSeatAction = (
    seatId: number,
    pendingAction: PendingSeatAction
  ) => {
    setPendingSeatActionsState((current) => ({
      ...current,
      [seatId]: pendingAction,
    }));
  };

  const clearPendingSeatAction = (seatId: number) => {
    setPendingSeatActionsState((current) => {
      const next = { ...current };
      delete next[seatId];
      return next;
    });
  };

  const setPendingSeatActionsForSeats = (
    seatIds: number[],
    pendingAction: PendingSeatAction
  ) => {
    setPendingSeatActionsState((current) => ({
      ...current,
      ...Object.fromEntries(seatIds.map((seatId) => [seatId, pendingAction])),
    }));
  };

  const clearPendingSeatActions = (seatIds: number[]) => {
    setPendingSeatActionsState((current) => {
      const next = { ...current };

      seatIds.forEach((seatId) => {
        delete next[seatId];
      });

      return next;
    });
  };

  const selectSeatMutation = useMutation({
    mutationFn: (seatId: number) =>
      selectSeat(performanceId, seatId, accessToken),
    onMutate: async (seatId) => {
      await queryClient.cancelQueries({
        queryKey: seatStateQueryKey,
      });

      const previousSeatState =
        queryClient.getQueryData<SeatState>(seatStateQueryKey);

      setPendingSeatAction(seatId, 'select');
      addSelectedSeat(seatId);

      updateSeatStateCache({
        authScope,
        performanceId,
        queryClient,
        seatId,
        status: 'OCCUPIED',
      });

      return { previousSeatState };
    },
    onError: (error, seatId, context) => {
      removeSelectedSeat(seatId);
      if (context?.previousSeatState) {
        queryClient.setQueryData(seatStateQueryKey, context.previousSeatState);
      }
      console.error('좌석 선택 API 호출에 실패했습니다.', error);
      enqueueSnackbar('좌석 선택 처리 중 오류가 발생했습니다.', {
        variant: 'error',
      });
    },
    onSettled: (_, __, seatId) => {
      clearPendingSeatAction(seatId);
    },
  });

  const deselectSeatMutation = useMutation({
    mutationFn: (seatId: number) =>
      deselectSeat(performanceId, seatId, accessToken),
    onMutate: async (seatId) => {
      await queryClient.cancelQueries({
        queryKey: seatStateQueryKey,
      });

      const previousSeatState =
        queryClient.getQueryData<SeatState>(seatStateQueryKey);

      setPendingSeatAction(seatId, 'deselect');
      removeSelectedSeat(seatId);

      updateSeatStateCache({
        authScope,
        performanceId,
        queryClient,
        seatId,
        status: 'AVAILABLE',
      });

      return { previousSeatState };
    },
    onError: (error, seatId, context) => {
      addSelectedSeat(seatId);
      if (context?.previousSeatState) {
        queryClient.setQueryData(seatStateQueryKey, context.previousSeatState);
      }
      console.error('좌석 선택 해제 API 호출에 실패했습니다.', error);
      enqueueSnackbar('좌석 선택 해제 중 오류가 발생했습니다.', {
        variant: 'error',
      });
    },
    onSettled: (_, __, seatId) => {
      clearPendingSeatAction(seatId);
    },
  });

  const clearSeatsMutation = useMutation({
    mutationFn: () => deselectAllSeats(performanceId, accessToken),
    onMutate: async () => {
      const seatIds = [...selectedSeatIds];

      await queryClient.cancelQueries({
        queryKey: seatStateQueryKey,
      });

      const previousSeatState =
        queryClient.getQueryData<SeatState>(seatStateQueryKey);

      setPendingSeatActionsForSeats(seatIds, 'deselect');
      setSelectedSeatIds([]);

      updateSeatStatesCache({
        authScope,
        performanceId,
        queryClient,
        seatIds,
        status: 'AVAILABLE',
      });

      return { previousSeatState, seatIds };
    },
    onError: (error, _, context) => {
      setSelectedSeatIds(context?.seatIds ?? []);
      if (context?.previousSeatState) {
        queryClient.setQueryData(seatStateQueryKey, context.previousSeatState);
      }
      console.error('좌석 전체 해제 API 호출에 실패했습니다.', error);
      enqueueSnackbar('좌석 전체 해제 중 오류가 발생했습니다.', {
        variant: 'error',
      });
    },
    onSettled: (_, __, ___, context) => {
      clearPendingSeatActions(context?.seatIds ?? []);
    },
  });

  // 좌석을 선택 - 낙관적 업데이트(store 선반영) 후 API 호출
  const handleSelectSeat = async (seatId: number) => {
    if (!accessToken) {
      enqueueSnackbar('로그인 후 좌석을 선택할 수 있습니다.', {
        variant: 'warning',
      });
      return;
    }

    await selectSeatMutation.mutateAsync(seatId);
  };

  // 좌석 선택을 해제 - 낙관적 업데이트(store 선제거) 후 API 호출
  const handleDeselectSeat = async (seatId: number) => {
    if (!accessToken) {
      enqueueSnackbar('로그인 후 좌석 선택을 해제할 수 있습니다.', {
        variant: 'warning',
      });
      return;
    }

    await deselectSeatMutation.mutateAsync(seatId);
  };

  // 현재 선택된 모든 좌석을 한 번에 해제
  const handleClearSeats = async () => {
    if (!accessToken) {
      enqueueSnackbar('로그인 후 좌석 선택을 해제할 수 있습니다.', {
        variant: 'warning',
      });
      return;
    }

    if (!selectedSeatIds.length) return;

    await clearSeatsMutation.mutateAsync();
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
