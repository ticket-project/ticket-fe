import * as React from 'react';
import { Card, CardActionArea, Box, Typography, Stack } from '@mui/material';

export type OverlayTourCardProps = {
  href?: string;
  backgroundSrc: string;
  backgroundAlt: string;
  topLabel?: string; // "울산,대전 티켓오픈"
  title: string; // "싱어게인4 전국투어 콘서트"
  placeText?: string; // "전국 각 지역"
  periodText?: string; // "2026.02.07 -"
  onClick?: () => void;
};

export function OverlayTourCard({
  backgroundAlt,
  backgroundSrc,
  href,
  onClick,
  periodText,
  placeText,
  title,
  topLabel,
}: OverlayTourCardProps) {
  const clickable = Boolean(href || onClick);

  return (
    <Card
      elevation={0}
      sx={{
        border: '1px solid',
        borderRadius: 4,
        borderColor: 'divider',
        overflow: 'hidden',
      }}
    >
      <CardActionArea
        component={href ? 'a' : 'button'}
        href={href}
        onClick={onClick}
        disabled={!clickable}
        aria-label={title}
        sx={{
          display: 'block',
          textAlign: 'left',
          '&.Mui-disabled': { opacity: 1, pointerEvents: 'none' },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            aspectRatio: '3 / 4',
            bgcolor: 'grey.100',
          }}
        >
          {/* Background image */}
          <Box
            component="img"
            src={backgroundSrc}
            alt={backgroundAlt}
            loading="lazy"
            sx={{
              position: 'absolute',
              height: '100%',
              width: '100%',
              inset: 0,
              objectFit: 'cover',
              transform: 'scale(1.02)',
            }}
          />

          {/* Overlay gradient */}
          <Box
            sx={{
              position: 'absolute',
              background:
                'linear-gradient(180deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.72) 100%)',
              inset: 0,
            }}
          />

          {/* Text */}
          <Box
            sx={{
              position: 'absolute',
              display: 'flex',
              flexDirection: 'column',
              gap: 1.25,
              justifyContent: 'flex-end',
              color: 'common.white',
              inset: 0,
              p: 2.25,
            }}
          >
            {topLabel ? (
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 800,
                  letterSpacing: '-0.01em',
                  opacity: 0.9,
                }}
              >
                {topLabel}
              </Typography>
            ) : null}

            <Typography
              variant="h4"
              sx={{
                display: '-webkit-box',
                fontWeight: 900,
                letterSpacing: '-0.04em',
                lineHeight: 1.05,
                overflow: 'hidden',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 2,
              }}
            >
              {title}
            </Typography>

            <Stack spacing={0.25}>
              {placeText ? (
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 800, opacity: 0.95 }}
                >
                  {placeText}
                </Typography>
              ) : null}
              {periodText ? (
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 800, opacity: 0.95 }}
                >
                  {periodText}
                </Typography>
              ) : null}
            </Stack>
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  );
}
