'use client';

import {
  Tooltip as MuiTooltip,
  TooltipProps as MuiTooltipProps,
} from '@mui/material';

type TooltipProps = Omit<MuiTooltipProps, 'children'> & {
  children: MuiTooltipProps['children'];
};

const Tooltip = ({ children, ...props }: TooltipProps) => {
  return (
    <MuiTooltip
      arrow
      slotProps={{
        tooltip: {
          sx: {
            bgcolor: 'white',
            color: 'text.primary',
            border: '1px solid',
            borderColor: 'grey.300',
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            maxWidth: 'none',
          },
        },
        arrow: {
          sx: {
            color: 'white',
            '&::before': {
              border: '1px solid',
              borderColor: 'grey.300',
            },
          },
        },
      }}
      {...props}
    >
      {children}
    </MuiTooltip>
  );
};

export default Tooltip;
