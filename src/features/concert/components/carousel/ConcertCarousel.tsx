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
import { ConcertCarouselItem } from '../../types/concert.types';
import CarouselNavButton from './CarouselNavButton';
import ConcertCarouselSlide from './ConcertCarouselSlide';
const AUTOPLAY_DELAY = 5000;

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
      align: 'center',
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

  const getIsActive = (idx: number) => {
    if (!isCarouselEnabled) return false;
    const prevIndex =
      selectedIndex === 0 ? items.length - 1 : selectedIndex - 1;
    const nextIndex =
      selectedIndex === items.length - 1 ? 0 : selectedIndex + 1;

    return idx === prevIndex || idx === selectedIndex || idx === nextIndex;
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        ref={carouselRef}
        role="region"
        aria-label="최신 콘서트 배너"
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <Box sx={{ display: 'flex', gap: 2.6, px: 2.6 }}>
          {items.map((item, idx) => (
            <ConcertCarouselSlide
              key={item.id}
              item={item}
              idx={idx}
              total={items.length}
              isActive={getIsActive(idx)}
              isSelected={selectedIndex === idx}
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
