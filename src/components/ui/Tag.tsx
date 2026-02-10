import { ReactNode } from 'react';

import { Chip, ChipProps } from '@mui/material';

export type TagColor = 'default' | 'primary';

export interface TagProps extends Omit<ChipProps, 'color' | 'label'> {
  label: ReactNode;
  variant?: 'filled' | 'outlined';
  color?: TagColor;
  size?: 'small' | 'medium';
}

const Tag = ({
  color = 'default',
  label,
  size = 'medium',
  sx,
  variant = 'filled',
  ...rest
}: TagProps) => {
  const baseSx = {
    fontSize: size === 'small' ? '1.1rem' : '1.3rem',
    fontWeight: 900,
    borderRadius: '6px',
  };

  const variantSx =
    variant === 'filled' && color === 'default'
      ? {
          color: 'text.primary',
          backgroundColor: 'grey.100',
        }
      : variant === 'filled' && color !== 'default'
        ? {
            color: `${color}.main`,
            backgroundColor: `${color}.light`,
          }
        : {};
  return (
    <Chip
      label={label}
      variant={variant}
      color={color}
      size={size}
      sx={{ ...baseSx, ...variantSx, ...sx }}
      {...rest}
    />
  );
};

export default Tag;
