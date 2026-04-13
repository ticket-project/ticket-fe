'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

interface UseBookingLeaveGuardProps {
  confirmMessage: string;
  hasPendingResource: boolean;
  onConfirmLeave: () => Promise<void>;
  onReleaseInBackground: () => Promise<void>;
}

const HISTORY_SENTINEL_STATE = {
  __seatLeaveGuard: true,
};

const isModifiedClick = (event: MouseEvent) =>
  event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;

const isSameDocumentNavigation = (nextUrl: URL, currentUrl: URL) =>
  nextUrl.pathname === currentUrl.pathname &&
  nextUrl.search === currentUrl.search;

const useBookingLeaveGuard = ({
  confirmMessage,
  hasPendingResource,
  onConfirmLeave,
  onReleaseInBackground,
}: UseBookingLeaveGuardProps) => {
  const router = useRouter();

  const hasPendingResourceRef = useRef(hasPendingResource);
  const hasReleasedResourceRef = useRef(false);
  const isHistoryGuardArmedRef = useRef(false);
  const isHandlingPopStateRef = useRef(false);
  const isLeavingRef = useRef(false);
  const onConfirmLeaveRef = useRef(onConfirmLeave);
  const onReleaseInBackgroundRef = useRef(onReleaseInBackground);
  const shouldSkipGuardRef = useRef(false);

  const allowLeaveGuardExit = () => {
    shouldSkipGuardRef.current = true;
    hasReleasedResourceRef.current = true;
  };

  const requestBackNavigation = () => {
    window.history.back();
  };

  useEffect(() => {
    hasPendingResourceRef.current = hasPendingResource;
  }, [hasPendingResource]);

  useEffect(() => {
    onConfirmLeaveRef.current = onConfirmLeave;
  }, [onConfirmLeave]);

  useEffect(() => {
    onReleaseInBackgroundRef.current = onReleaseInBackground;
  }, [onReleaseInBackground]);

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

      if (!hasPendingResourceRef.current) {
        allowLeaveGuardExit();
        leaveAction();
        return;
      }

      const isConfirmed = window.confirm(confirmMessage);

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
        allowLeaveGuardExit();
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

    const releaseInBackground = () => {
      if (
        shouldSkipGuardRef.current ||
        hasReleasedResourceRef.current ||
        !hasPendingResourceRef.current
      ) {
        return;
      }

      hasReleasedResourceRef.current = true;

      void onReleaseInBackgroundRef.current().catch((error) => {
        console.error(
          '페이지 이탈 처리 중 백그라운드 해제에 실패했습니다.',
          error
        );
      });
    };

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (shouldSkipGuardRef.current || !hasPendingResourceRef.current) {
        return;
      }

      event.preventDefault();
      event.returnValue = '';
    };

    const handlePageHide = () => {
      releaseInBackground();
    };

    const handlePageShow = () => {
      if (shouldSkipGuardRef.current) {
        return;
      }

      hasReleasedResourceRef.current = false;
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
    };
  }, [confirmMessage, router]);

  return {
    allowLeaveGuardExit,
    requestBackNavigation,
  };
};

export default useBookingLeaveGuard;
