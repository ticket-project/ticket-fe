'use client';
import {
  useCallback,
  KeyboardEvent,
  useMemo,
  useEffect,
  useState,
} from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Box } from '@mui/material';
import Autoplay from 'embla-carousel-autoplay';
import { ConcertCarouselItem } from '../../types';
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

  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start' }, [autoplay]);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const isCarouselEnabled = items.length > 1;

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

  useEffect(() => {
    if (!emblaApi) return;

    const updateButtonStates = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    updateButtonStates();
    emblaApi.on('select', updateButtonStates);
    emblaApi.on('reInit', updateButtonStates);

    return () => {
      emblaApi.off('select', updateButtonStates);
      emblaApi.off('reInit', updateButtonStates);
    };
  }, [emblaApi]);

  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        ref={emblaRef}
        role="region"
        aria-label="최신 콘서트 배너"
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <ConcertCarouselContainer as="ul">
          {items.map((item, idx) => (
            <ConcertCarouselSlide
              key={item.id}
              item={item}
              idx={idx}
              total={items.length}
            />
          ))}
        </ConcertCarouselContainer>
      </Box>
      {isCarouselEnabled && (
        <>
          <CarouselNavButton
            direction="prev"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
          />
          <CarouselNavButton
            direction="next"
            onClick={scrollNext}
            disabled={!canScrollNext}
          />
        </>
      )}
    </Box>
  );
};

export default ConcertCarousel;
