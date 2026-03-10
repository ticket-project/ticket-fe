'use client';

import { useEffect, useMemo } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '@/lib/queryKeys';
import { useAuthStore } from '@/store/authStore';
import { useBookingStore } from '@/store/bookingStore';

import { SeatSocketClient } from '../lib/seatSocketClient';
import { SeatSelectionEvent } from '../types';

interface UseSeatSocketParams {
  performanceId: number;
}

const useSeatSocket = ({ performanceId }: UseSeatSocketParams) => {
  const queryClient = useQueryClient();
  const accessToken = useAuthStore((state) => state.accessToken);

  const addSelectedByOther = useBookingStore(
    (state) => state.addSelectedByOther
  );
  const removeSelectedByOther = useBookingStore(
    (state) => state.removeSelectedByOther
  );
  const isSelectedByMe = useBookingStore((state) => state.isSelectedByMe);

  const client = useMemo(() => new SeatSocketClient(), []);

  const handleSeatEvent = useMemo(() => {
    return (event: SeatSelectionEvent) => {
      if (event.performanceId !== performanceId) return;

      const shouldOccupySeat =
        event.action === 'SELECTED' ||
        event.action === 'HELD' ||
        event.action === 'RESERVED';
      const shouldReleaseSeat =
        event.action === 'DESELECTED' || event.action === 'RELEASED';

      if (isSelectedByMe(event.seatId) && shouldOccupySeat) return;

      if (shouldOccupySeat) {
        addSelectedByOther(event.seatId);
        queryClient.invalidateQueries({
          queryKey: queryKeys.booking.seatState(performanceId),
        });
        return;
      }
      if (shouldReleaseSeat) {
        removeSelectedByOther(event.seatId);
        queryClient.invalidateQueries({
          queryKey: queryKeys.booking.seatState(performanceId),
        });
        return;
      }
    };
  }, [
    addSelectedByOther,
    removeSelectedByOther,
    isSelectedByMe,
    performanceId,
    queryClient,
  ]);

  useEffect(() => {
    if (!accessToken) {
      client.disconnect();
      return;
    }

    client.connect({
      accessToken,
      onConnect: () => {
        queryClient.invalidateQueries({
          queryKey: queryKeys.booking.seatState(performanceId),
        });
        client.subscribeSeatEvents({
          performanceId,
          onMessage: handleSeatEvent,
        });
      },
      onWebSocketError: (event) => {
        console.error('seat websocket error', event);
      },
      onStompError: (frame) => {
        console.error('seat stomp error', frame);
      },
    });

    return () => {
      client.unsubscribeSeatEvents();
      client.disconnect();
    };
  }, [accessToken, client, handleSeatEvent, performanceId, queryClient]);

  return null;
};

export default useSeatSocket;
