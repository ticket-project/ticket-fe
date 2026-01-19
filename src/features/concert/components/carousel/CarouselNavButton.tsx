import { IconButton, IconButtonProps } from '@mui/material';
import ChevronLeftRounded from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRounded from '@mui/icons-material/ChevronRightRounded';

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
  const position = direction === 'prev' ? { left: 40 } : { right: 40 };

  return (
    <IconButton
      aria-label={defaultLabel}
      sx={{
        position: 'absolute',
        ...position,
        top: '50%',
        height: 58,
        width: 58,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 1)',
        },
        transform: 'translateY(-50%)',
        ...sx,
      }}
      {...props}
    >
      <Icon sx={{ fontSize: 40 }} />
    </IconButton>
  );
}
