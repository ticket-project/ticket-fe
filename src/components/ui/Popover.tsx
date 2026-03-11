import { ReactNode } from 'react';

import { Close } from '@mui/icons-material';
import {
  Box,
  IconButton,
  Popover as MuiPopover,
  PopoverProps as MuiPopoverProps,
  SxProps,
  Theme,
} from '@mui/material';

interface PopoverProps extends Omit<
  MuiPopoverProps,
  'children' | 'slotProps' | 'onClose'
> {
  children: ReactNode;
  width?: number | string;
  paperSx?: SxProps<Theme>;
  showCloseButton?: boolean;
  onClose?: MuiPopoverProps['onClose'];
}

const DEFAULT_BOX_SHADOW = '0 1.2rem 3rem rgba(17, 24, 39, 0.12)';

const Popover = ({
  children,
  width = '17rem',
  paperSx,
  showCloseButton = true,
  onClose,
  ...props
}: PopoverProps) => {
  return (
    <MuiPopover
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width,
            position: 'relative',
            padding: '1.8rem 2rem',
            borderRadius: '1.2rem',
            border: '1px solid',
            borderColor: 'grey.200',
            boxShadow: DEFAULT_BOX_SHADOW,
            ...paperSx,
          },
        },
      }}
      {...props}
    >
      <>
        {showCloseButton && (
          <IconButton
            aria-label="팝오버 닫기"
            onClick={(event) => onClose?.(event, 'backdropClick')}
            sx={{
              position: 'absolute',
              top: '0.6rem',
              right: '0.6rem',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                '& svg': {
                  fontSize: '1.8rem',
                },
              }}
            >
              <Close />
            </Box>
          </IconButton>
        )}
        {children}
      </>
    </MuiPopover>
  );
};

export default Popover;
