import { useId, useState } from 'react';

import { inherits } from 'util';

import { PlayArrow } from '@mui/icons-material';
import { Button, ClickAwayListener, Typography } from '@mui/material';

import Tooltip from '@/components/ui/Tooltip';

import InstallmentTooltipContent from './InstallmentTooltipContent';

const InstallmentTooltip = () => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const tooltipId = useId();

  const handleTooltipClose = () => {
    setTooltipOpen(false);
  };

  const handleTooltipToggle = () => {
    setTooltipOpen((prev) => !prev);
  };

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <div>
        <Tooltip
          placement="bottom-end"
          open={tooltipOpen}
          onClose={handleTooltipClose}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          title={<InstallmentTooltipContent id={tooltipId} />}
        >
          <Button
            variant="text"
            aria-expanded={tooltipOpen}
            aria-describedby={tooltipOpen ? tooltipId : undefined}
            onClick={handleTooltipToggle}
            sx={{ p: 0, mb: 2, lineHeight: 1, '&:hover': { color: 'inherit' } }}
          >
            무이자할부
            <PlayArrow sx={{ fontSize: 13, ml: 0.2, mt: -0.1 }} />
          </Button>
        </Tooltip>
      </div>
    </ClickAwayListener>
  );
};

export default InstallmentTooltip;
