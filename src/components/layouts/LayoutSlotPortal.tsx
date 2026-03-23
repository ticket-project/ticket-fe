'use client';

import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { Box } from '@mui/material';

interface LayoutSlotPortalProps {
  children: ReactNode;
  mobileSpacerHeight?: string;
  slotId: string;
}

const LayoutSlotPortal = ({
  children,
  mobileSpacerHeight = '78px',
  slotId,
}: LayoutSlotPortalProps) => {
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setTargetElement(document.getElementById(slotId));
  }, [slotId]);

  if (!targetElement) {
    return null;
  }

  return createPortal(
    <>
      <Box
        aria-hidden="true"
        sx={{
          display: { xs: 'block', lg: 'none' },
          height: `calc(${mobileSpacerHeight} + env(safe-area-inset-bottom, 0px))`,
        }}
      />
      {children}
    </>,
    targetElement
  );
};

export default LayoutSlotPortal;
