import { useState } from 'react';

import { PlayArrow } from '@mui/icons-material';
import { Typography } from '@mui/material';

import Tooltip from '@/components/ui/Tooltip';

import InstallmentTooltipContent from './InstallmentTooltipContent';

const InstallmentTooltip = () => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  return (
    <Tooltip
      placement="bottom-end"
      open={tooltipOpen}
      onClose={() => setTooltipOpen(false)}
      title={<InstallmentTooltipContent />}
    >
      <Typography
        variant="body2"
        sx={{
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          mb: 1,
        }}
        onClick={() => setTooltipOpen(!tooltipOpen)}
      >
        무이자할부
        <PlayArrow sx={{ fontSize: 13, ml: 0.2, mt: -0.1 }} />
      </Typography>
    </Tooltip>
  );
};

export default InstallmentTooltip;
