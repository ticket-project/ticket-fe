'use client';

import * as React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import Link from 'next/link';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import ChevronLeftRounded from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRounded from '@mui/icons-material/ChevronRightRounded';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';

export type BannerItem = {
  id: string;
  title: string;
  subtitle?: string;
  href: string;
  image: { src: string; alt: string };
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(m.matches);
    onChange();
    m.addEventListener?.('change', onChange);
    return () => m.removeEventListener?.('change', onChange);
  }, []);
  return reduced;
}

export default function ConcertCarousel({
  autoPlayMs = 3000,
  items,
}: {
  items: BannerItem[];
  autoPlayMs?: number;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    // 드래그는 모바일 UX에 중요
    dragFree: false,
    loop: true,
  });

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(true);

  const scrollPrev = React.useCallback(
    () => emblaApi?.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = React.useCallback(
    () => emblaApi?.scrollNext(),
    [emblaApi]
  );
  const scrollTo = React.useCallback(
    (i: number) => emblaApi?.scrollTo(i),
    [emblaApi]
  );

  React.useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  // 자동재생: 접근성 때문에 "정지" 가능해야 하고,
  // prefers-reduced-motion이면 기본 OFF 권장
  React.useEffect(() => {
    if (!emblaApi) return;
    if (reducedMotion) return;
    if (!isPlaying) return;
    if (items.length <= 1) return;

    const id = window.setInterval(() => {
      emblaApi.scrollNext();
    }, autoPlayMs);

    return () => window.clearInterval(id);
  }, [emblaApi, isPlaying, autoPlayMs, items.length, reducedMotion]);

  // Hover/Focus 시 자동재생 잠시 멈춤(사용자가 읽을 시간 보장)
  const pause = React.useCallback(() => setIsPlaying(false), []);
  const resume = React.useCallback(() => {
    if (!reducedMotion) setIsPlaying(true);
  }, [reducedMotion]);

  if (items.length === 0) return null;

  return (
    <Box
      component="section"
      aria-roledescription="carousel"
      aria-label="프로모션 배너"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocusCapture={pause}
      onBlurCapture={resume}
      sx={{
        position: 'relative',
        borderRadius: 3,
        overflow: 'hidden',
      }}
    >
      {/* Viewport */}
      <Box ref={emblaRef} sx={{ overflow: 'hidden' }}>
        {/* Container */}
        <Box sx={{ display: 'flex' }}>
          {items.map((item, idx) => (
            <Box
              key={item.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${idx + 1} / ${items.length}`}
              sx={{
                position: 'relative',
                flex: '0 0 100%',
                minWidth: 0,
              }}
            >
              <Link
                href={item.href}
                aria-label={`${item.title} 이동`}
                style={{ position: 'relative', display: 'block' }}
              >
                {/* 이미지: LCP 대상이므로 첫 장 priority */}
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '16 / 6',
                  }}
                >
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    priority={idx === 0}
                    sizes="(max-width: 600px) 100vw, (max-width: 1200px) 100vw, 1200px"
                    style={{ objectFit: 'cover' }}
                  />
                </Box>

                {/* 텍스트 오버레이 */}
                <Box
                  sx={{
                    position: 'absolute',
                    alignItems: 'flex-end',
                    display: 'flex',
                    background:
                      'linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0.0) 60%)',
                    inset: 0,
                    p: { sm: 3, xs: 2 },
                  }}
                >
                  <Box sx={{ color: 'common.white' }}>
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: 800, lineHeight: 1.2 }}
                    >
                      {item.title}
                    </Typography>
                    {item.subtitle && (
                      <Typography
                        variant="body1"
                        sx={{ mt: 0.5, opacity: 0.9 }}
                      >
                        {item.subtitle}
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Link>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Prev/Next */}
      {items.length > 1 && (
        <>
          <IconButton
            onClick={scrollPrev}
            aria-label="이전 배너"
            sx={{
              position: 'absolute',
              left: 8,
              top: '50%',
              '&:hover': { bgcolor: 'rgba(0,0,0,0.5)' },
              bgcolor: 'rgba(0,0,0,0.35)',
              transform: 'translateY(-50%)',
            }}
          >
            <ChevronLeftRounded htmlColor="#fff" />
          </IconButton>

          <IconButton
            onClick={scrollNext}
            aria-label="다음 배너"
            sx={{
              position: 'absolute',
              right: 8,
              top: '50%',
              '&:hover': { bgcolor: 'rgba(0,0,0,0.5)' },
              bgcolor: 'rgba(0,0,0,0.35)',
              transform: 'translateY(-50%)',
            }}
          >
            <ChevronRightRounded htmlColor="#fff" />
          </IconButton>
        </>
      )}

      {/* Dots + Play/Pause */}
      {items.length > 1 && (
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{
            position: 'absolute',
            bottom: 10,
            left: 12,
            right: 12,
            justifyContent: 'space-between',
          }}
        >
          <Stack direction="row" spacing={0.75} aria-label="배너 인디케이터">
            {items.map((_, i) => {
              const selected = i === selectedIndex;
              return (
                <Box
                  key={i}
                  component="button"
                  type="button"
                  onClick={() => scrollTo(i)}
                  aria-label={`${i + 1}번째 배너로 이동`}
                  aria-current={selected ? 'true' : undefined}
                  style={{
                    height: 10,
                    width: selected ? 18 : 10,
                    background: selected
                      ? 'rgba(255,255,255,0.95)'
                      : 'rgba(255,255,255,0.55)',
                    border: 0,
                    borderRadius: 999,
                    cursor: 'pointer',
                    transition: 'width 150ms ease',
                  }}
                />
              );
            })}
          </Stack>

          <IconButton
            onClick={() => setIsPlaying((v) => !v)}
            aria-label={isPlaying ? '자동 재생 일시정지' : '자동 재생 시작'}
            sx={{
              '&:hover': { bgcolor: 'rgba(0,0,0,0.5)' },
              bgcolor: 'rgba(0,0,0,0.35)',
            }}
          >
            {isPlaying ? (
              <PauseRounded htmlColor="#fff" />
            ) : (
              <PlayArrowRounded htmlColor="#fff" />
            )}
          </IconButton>
        </Stack>
      )}
    </Box>
  );
}
