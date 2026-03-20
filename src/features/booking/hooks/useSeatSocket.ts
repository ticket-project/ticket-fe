'use client';

import { useCallback, useEffect, useMemo } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { useAuthStore } from '@/store/authStore';
import { useBookingStore } from '@/store/bookingStore';

import { SeatSocketClient } from '../lib/seatSocketClient';
import {
  getSeatStateAuthScope,
  updateSeatStateCache,
} from '../lib/seatStateCache';
import { SeatSelectionEvent } from '../types';

interface UseSeatSocketParams {
  performanceId: number;
}

const useSeatSocket = ({ performanceId }: UseSeatSocketParams) => {
  const queryClient = useQueryClient();
  const accessToken = useAuthStore((state) => state.accessToken);
  const authScope = getSeatStateAuthScope(accessToken);

  const addSelectedByOther = useBookingStore(
    (state) => state.addSelectedByOther
  );
  const removeSelectedByOther = useBookingStore(
    (state) => state.removeSelectedByOther
  );
  const isSelectedByMe = useBookingStore((state) => state.isSelectedByMe);

  const client = useMemo(() => new SeatSocketClient(), []);

  const handleSeatEvent = useCallback(
    (event: SeatSelectionEvent) => {
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
        updateSeatStateCache({
          authScope,
          performanceId,
          queryClient,
          seatId: event.seatId,
          action: event.action,
        });
        return;
      }

      if (shouldReleaseSeat) {
        removeSelectedByOther(event.seatId);
        updateSeatStateCache({
          authScope,
          performanceId,
          queryClient,
          seatId: event.seatId,
          action: event.action,
        });
      }
    },
    [
      addSelectedByOther,
      authScope,
      removeSelectedByOther,
      isSelectedByMe,
      performanceId,
      queryClient,
    ]
  );

  useEffect(() => {
    if (!accessToken) {
      client.disconnect();
      return;
    }

    client.connect({
      accessToken,
      onConnect: () => {
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
  }, [accessToken, client, handleSeatEvent, performanceId]);

  return null;
};

export default useSeatSocket;
