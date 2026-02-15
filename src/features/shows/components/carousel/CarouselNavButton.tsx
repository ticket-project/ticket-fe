import ChevronLeftRounded from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRounded from '@mui/icons-material/ChevronRightRounded';
import { IconButtonProps } from '@mui/material';

import { StyledIconButton } from './LatestShowsCarousel.styles';

interface CarouselNavButtonProps extends Omit<IconButtonProps, 'children'> {
  direction: 'prev' | 'next';
}

export default function CarouselNavButton({
  direction,
  sx,
  ...props
}: CarouselNavButtonProps) {
  const defaultLabel = direction === 'prev' ? '이전' : '다음';
  const Icon = direction === 'prev' ? ChevronLeftRounded : ChevronRightRounded;

  return (
    <StyledIconButton
      aria-label={defaultLabel}
      direction={direction}
      sx={sx}
      {...props}
    >
      <Icon sx={{ fontSize: 40 }} />
    </StyledIconButton>
  );
}
