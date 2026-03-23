'use client';

import Image from 'next/image';

import {
  GradientOverlay,
  PosterBackground,
  PosterCard,
  PosterContent,
  Root,
} from './UpcomingPoster.styles';

interface UpcomingPosterProps {
  title: string;
  posterUrl: string;
}

const UpcomingPoster = ({ title, posterUrl }: UpcomingPosterProps) => {
  return (
    <Root>
      <PosterBackground posterUrl={posterUrl} aria-hidden />
      <GradientOverlay aria-hidden />
      <PosterContent>
        <PosterCard>
          <Image
            src={posterUrl}
            alt={`${title} 포스터`}
            fill
            priority
            sizes="(max-width: 600px) 70vw, (max-width: 900px) 46vw, 368px"
            style={{ objectFit: 'cover' }}
          />
        </PosterCard>
      </PosterContent>
    </Root>
  );
};

export default UpcomingPoster;
