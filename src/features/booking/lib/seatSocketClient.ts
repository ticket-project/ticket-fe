import { Client, IFrame, StompSubscription } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

import { SeatSelectionEvent } from '../types';

interface ConnectOptions {
  accessToken?: string | null;
  onConnect?: () => void;
  onStompError?: (frame: IFrame) => void;
  onWebSocketError?: (event: Event) => void;
}

interface SubscribeOptions {
  performanceId: number;
  onMessage: (event: SeatSelectionEvent) => void;
}

export class SeatSocketClient {
  private client: Client | null = null;
  private subscription: StompSubscription | null = null;

  private resolveWsUrl() {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, '');

    if (baseUrl) {
      return `${baseUrl}/ws`;
    }

    if (typeof window !== 'undefined') {
      return `${window.location.origin}/ws`;
    }

    return '/ws';
  }

  private parseSeatEvent(body: string): SeatSelectionEvent | null {
    const payload = JSON.parse(body) as {
      performanceId?: unknown;
      seatId?: unknown;
      action?: unknown;
      timestamp?: unknown;
    };

    const performanceId = Number(payload.performanceId);
    const seatId = Number(payload.seatId);

    if (!Number.isFinite(performanceId) || !Number.isFinite(seatId)) {
      return null;
    }

    const action =
      payload.action === 'SELECTED' ||
      payload.action === 'DESELECTED' ||
      payload.action === 'HELD' ||
      payload.action === 'RELEASED' ||
      payload.action === 'RESERVED'
        ? payload.action
        : null;

    if (!action) {
      return null;
    }

    return {
      performanceId,
      seatId,
      action,
      timestamp:
        typeof payload.timestamp === 'string'
          ? payload.timestamp
          : new Date().toISOString(),
    };
  }

  connect({
    accessToken,
    onConnect,
    onStompError,
    onWebSocketError,
  }: ConnectOptions) {
    if (this.client?.active) return;

    this.client = new Client({
      webSocketFactory: () => new SockJS(this.resolveWsUrl()),
      reconnectDelay: 5000,
      connectHeaders: accessToken
        ? {
            Authorization: `Bearer ${accessToken}`,
          }
        : {},
      debug:
        process.env.NODE_ENV === 'development'
          ? (message) => {
              console.warn('[seat-socket]', message);
            }
          : undefined,
      onConnect: () => {
        onConnect?.();
      },
      onStompError: (frame) => {
        onStompError?.(frame);
      },
      onWebSocketError: (event) => {
        onWebSocketError?.(event);
      },
    });

    this.client.activate();
  }

  disconnect() {
    this.unsubscribeSeatEvents();
    this.client?.deactivate();
    this.client = null;
  }

  subscribeSeatEvents({ performanceId, onMessage }: SubscribeOptions) {
    if (!this.client?.connected) return;

    this.unsubscribeSeatEvents();

    this.subscription = this.client.subscribe(
      `/topic/performance/${performanceId}/seats`,
      (message) => {
        try {
          const payload = this.parseSeatEvent(message.body);
          if (!payload) {
            console.warn('좌석 소켓 메시지 파싱 실패', message.body);
            return;
          }
          onMessage(payload);
        } catch (error) {
          console.error('좌석 소켓 메시지 파싱 실패', error);
        }
      }
    );
  }

  unsubscribeSeatEvents() {
    this.subscription?.unsubscribe();
    this.subscription = null;
  }
}
