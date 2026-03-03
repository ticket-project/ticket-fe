import 'dayjs/locale/ko';

import Image from 'next/image';

import { Box, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';

import { Performances } from '@/features/shows/types';

import { NOTICE_HIGHLIGHTS } from '@/features/shows/constants';

import { formatDateTime } from '../../utils';

import { InfoTitle } from './ShowDetailTabs.styles';

interface ShowInfoTabProps {
  performanceDates: Performances[];
  posterUrl: string;
}

const ShowInfoTab = ({ performanceDates, posterUrl }: ShowInfoTabProps) => {
  const performanceTimeLabels = performanceDates
    .flatMap(({ performances }) => performances)
    .sort((a, b) => {
      const diff = dayjs(a.startTime).valueOf() - dayjs(b.startTime).valueOf();
      return diff !== 0 ? diff : a.performanceNo - b.performanceNo;
    })
    .map(({ startTime }) => formatDateTime(startTime));

  return (
    <Stack spacing={8}>
      <Box>
        <InfoTitle variant="h6">공연시간 정보</InfoTitle>
        <Stack spacing={0.5}>
          {performanceTimeLabels.map((time, index) => (
            <Typography
              key={`${time}-${index}`}
              variant="body2"
              sx={{ fontWeight: 500 }}
            >
              {time}
            </Typography>
          ))}
        </Stack>
      </Box>
      <Box>
        <InfoTitle variant="h6">공지사항</InfoTitle>
        <Stack component="ul" spacing={1.5}>
          {NOTICE_HIGHLIGHTS.map((notice, index) => (
            <Box key={`notice-${index}`} component="li">
              <Typography
                variant="body2"
                sx={{ color: '#4154ff', fontWeight: 700 }}
              >
                {notice}
              </Typography>
              {index === 3 && (
                <Box sx={{ mt: 1.5 }}>
                  <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.5 }}>
                    [휠체어석 예매 안내]
                  </Typography>
                  <Typography variant="body2">
                    ※ 휠체어석 구매는 ONE 티켓 고객센터(1544-1234)를 통해
                    전화예매만 가능합니다 (*고객센터 운영시간 오전 9시~오후 6시)
                  </Typography>
                  <Typography variant="body2">
                    ※ 자세한 사항은 하단 상세이미지 내 &apos;휠체어석 예매
                    안내&apos;를 확인해 주시기 바랍니다.
                  </Typography>
                </Box>
              )}
            </Box>
          ))}
        </Stack>
      </Box>
      <Box>
        <InfoTitle variant="h6">공연상세 / 출연진정보</InfoTitle>
        <Box sx={{ pr: 13 }}>
          <Image
            src={posterUrl}
            alt="공연상세"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: 'auto' }}
          />
        </Box>
      </Box>
    </Stack>
  );
};

export default ShowInfoTab;
