'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

import { deselectAllSeatsInBackground } from '../api';

interface UseSeatLeaveGuardProps {
  accessToken?: string | null;
  hasSelectedSeats: boolean;
  onConfirmLeave: () => Promise<void>;
  performanceId: number;
}

const HISTORY_SENTINEL_STATE = {
  __seatLeaveGuard: true,
};

const LEAVE_CONFIRM_MESSAGE = '선택한 좌석이 해제됩니다. 이동하시겠습니까?';

const isModifiedClick = (event: MouseEvent) =>
  event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;

const isSameDocumentNavigation = (nextUrl: URL, currentUrl: URL) =>
  nextUrl.pathname === currentUrl.pathname &&
  nextUrl.search === currentUrl.search;

const useSeatLeaveGuard = ({
  accessToken,
  hasSelectedSeats,
  onConfirmLeave,
  performanceId,
}: UseSeatLeaveGuardProps) => {
  const router = useRouter();

  const hasSelectedSeatsRef = useRef(hasSelectedSeats);
  const hasReleasedSeatsRef = useRef(false);
  const isHistoryGuardArmedRef = useRef(false);
  const isHandlingPopStateRef = useRef(false);
  const isLeavingRef = useRef(false);
  const onConfirmLeaveRef = useRef(onConfirmLeave);
  const shouldSkipGuardRef = useRef(false);

  const allowSeatPageExit = () => {
    shouldSkipGuardRef.current = true;
    hasReleasedSeatsRef.current = true;
  };

  const requestBackNavigation = () => {
    window.history.back();
  };

  useEffect(() => {
    hasSelectedSeatsRef.current = hasSelectedSeats;
  }, [hasSelectedSeats]);

  useEffect(() => {
    onConfirmLeaveRef.current = onConfirmLeave;
  }, [onConfirmLeave]);

  useEffect(() => {
    if (isHistoryGuardArmedRef.current) {
      return;
    }

    window.history.pushState(HISTORY_SENTINEL_STATE, '', window.location.href);
    isHistoryGuardArmedRef.current = true;
  }, []);

  useEffect(() => {
    const navigateToHref = (href: string) => {
      const nextUrl = new URL(href, window.location.href);

      if (nextUrl.origin !== window.location.origin) {
        window.location.href = nextUrl.toString();
        return;
      }

      const nextPath = `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`;
      router.push(nextPath);
    };

    const confirmAndLeave = async (
      leaveAction: () => void,
      options?: {
        restoreHistoryState?: boolean;
      }
    ) => {
      if (shouldSkipGuardRef.current || isLeavingRef.current) {
        return;
      }

      if (!hasSelectedSeatsRef.current) {
        allowSeatPageExit();
        leaveAction();
        return;
      }

      const isConfirmed = window.confirm(LEAVE_CONFIRM_MESSAGE);

      if (!isConfirmed) {
        if (options?.restoreHistoryState && isHistoryGuardArmedRef.current) {
          window.history.pushState(
            HISTORY_SENTINEL_STATE,
            '',
            window.location.href
          );
        }

        return;
      }

      isLeavingRef.current = true;

      try {
        await onConfirmLeaveRef.current();
        allowSeatPageExit();
        leaveAction();
      } catch {
        if (options?.restoreHistoryState && isHistoryGuardArmedRef.current) {
          window.history.pushState(
            HISTORY_SENTINEL_STATE,
            '',
            window.location.href
          );
        }
      } finally {
        isLeavingRef.current = false;
      }
    };

    const releaseSeatsInBackground = () => {
      if (
        shouldSkipGuardRef.current ||
        hasReleasedSeatsRef.current ||
        !hasSelectedSeatsRef.current
      ) {
        return;
      }

      hasReleasedSeatsRef.current = true;

      void deselectAllSeatsInBackground(performanceId, accessToken).catch(
        (error) => {
          console.error('좌석 이탈 해제 API 호출에 실패했습니다.', error);
        }
      );
    };

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (shouldSkipGuardRef.current || !hasSelectedSeatsRef.current) {
        return;
      }

      event.preventDefault();
      event.returnValue = '';
    };

    const handlePageHide = () => {
      releaseSeatsInBackground();
    };

    const handlePageShow = () => {
      if (shouldSkipGuardRef.current) {
        return;
      }

      hasReleasedSeatsRef.current = false;
    };

    const handlePopState = () => {
      if (shouldSkipGuardRef.current) {
        return;
      }

      if (isHandlingPopStateRef.current) {
        isHandlingPopStateRef.current = false;
        return;
      }

      isHandlingPopStateRef.current = true;

      void confirmAndLeave(
        () => {
          window.history.back();
        },
        {
          restoreHistoryState: true,
        }
      ).finally(() => {
        if (!shouldSkipGuardRef.current) {
          isHandlingPopStateRef.current = false;
        }
      });
    };

    const handleDocumentClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        isModifiedClick(event) ||
        shouldSkipGuardRef.current
      ) {
        return;
      }

      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const anchor = target.closest('a[href]');

      if (!(anchor instanceof HTMLAnchorElement)) {
        return;
      }

      if (
        anchor.target === '_blank' ||
        anchor.hasAttribute('download') ||
        anchor.dataset.bypassSeatLeaveGuard === 'true'
      ) {
        return;
      }

      const currentUrl = new URL(window.location.href);
      const nextUrl = new URL(anchor.href, currentUrl);

      if (isSameDocumentNavigation(nextUrl, currentUrl)) {
        return;
      }

      event.preventDefault();

      void confirmAndLeave(() => {
        navigateToHref(nextUrl.toString());
      });
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('pagehide', handlePageHide);
    window.addEventListener('pageshow', handlePageShow);
    window.addEventListener('popstate', handlePopState);
    document.addEventListener('click', handleDocumentClick, true);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('pagehide', handlePageHide);
      window.removeEventListener('pageshow', handlePageShow);
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('click', handleDocumentClick, true);

      releaseSeatsInBackground();
    };
  }, [accessToken, performanceId, router]);

  return {
    allowSeatPageExit,
    requestBackNavigation,
  };
};

export default useSeatLeaveGuard;
