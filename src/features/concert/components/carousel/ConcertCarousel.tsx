'use client';

import {
  useCallback,
  useEffect,
  useState,
  KeyboardEvent,
  useMemo,
} from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Box } from '@mui/material';
import Autoplay from 'embla-carousel-autoplay';
import { ConcertCarouselItem } from '../../types/carousel.types';
import CarouselNavButton from './CarouselNavButton';
import ConcertCarouselSlide from './ConcertCarouselSlide';

const AUTOPLAY_DELAY = 4000;

interface ConcertCarouselProps {
  items: ConcertCarouselItem[];
}

const ConcertCarousel = ({ items }: ConcertCarouselProps) => {
  const autoplay = useMemo(
    () => Autoplay({ delay: AUTOPLAY_DELAY, stopOnInteraction: true }),
    []
  );

  const [carouselRef, carouselApi] = useEmblaCarousel(
    {
      dragFree: false,
      loop: true,
    },
    [autoplay]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const isCarouselEnabled = items.length > 1;

  useEffect(() => {
    if (!carouselApi) return;

    const onSelect = () => {
      setSelectedIndex(carouselApi.selectedScrollSnap());
    };

    carouselApi.on('select', onSelect);
    onSelect();

    return () => {
      carouselApi.off('select', onSelect);
    };
  }, [carouselApi]);

  const scrollPrev = useCallback(() => {
    carouselApi?.scrollPrev();
  }, [carouselApi]);

  const scrollNext = useCallback(() => {
    carouselApi?.scrollNext();
  }, [carouselApi]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (!isCarouselEnabled) return;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        scrollPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        scrollNext();
      }
    },
    [isCarouselEnabled, scrollPrev, scrollNext]
  );

  if (items.length === 0) return null;

  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        ref={carouselRef}
        sx={{ overflow: 'hidden' }}
        role="region"
        aria-label="최신 콘서트 배너"
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <Box sx={{ display: 'flex', gap: 2, pl: 2 }}>
          {items.map((item, idx) => (
            <ConcertCarouselSlide
              key={item.id}
              item={item}
              idx={idx}
              total={items.length}
            />
          ))}
        </Box>
      </Box>
      {isCarouselEnabled && (
        <>
          <CarouselNavButton direction="prev" onClick={scrollPrev} />
          <CarouselNavButton direction="next" onClick={scrollNext} />
        </>
      )}
    </Box>
  );
};

export default ConcertCarousel;
