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
import { ConcertCarouselContainer } from './ConcertCarousel.styles';
const AUTOPLAY_DELAY = 5000;

interface ConcertCarouselProps {
  items: ConcertCarouselItem[];
}

const ConcertCarousel = ({ items }: ConcertCarouselProps) => {
  const autoplay = useMemo(
    () => Autoplay({ delay: AUTOPLAY_DELAY, stopOnInteraction: true }),
    []
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: 'center',
      loop: true,
    },
    [autoplay]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const isCarouselEnabled = items.length > 1;

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on('select', onSelect);
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

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

  return (
    <Box sx={{ position: 'relative', margin: '4rem 0' }}>
      <Box
        ref={emblaRef}
        role="region"
        aria-label="최신 콘서트 배너"
        onKeyDown={handleKeyDown}
        tabIndex={0}
        sx={{
          overflowX: 'clip',
        }}
      >
        <ConcertCarouselContainer as="ul">
          {items.map((item, idx) => (
            <ConcertCarouselSlide
              key={item.id}
              item={item}
              idx={idx}
              total={items.length}
              isSelected={selectedIndex === idx}
            />
          ))}
        </ConcertCarouselContainer>
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
