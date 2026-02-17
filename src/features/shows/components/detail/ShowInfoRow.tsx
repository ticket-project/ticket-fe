'use client';

import Image from 'next/image';
import Link from 'next/link';

import { ChevronRight } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';

import { ShowDetail } from '../../types';

import InstallmentTooltip from '../tooltip/InstallmentTooltip';

import { BenefitBadge } from './ShowDetail.styles';

interface ShowInfoRowProps {
  item: ShowDetail;
}

interface InfoRowProps {
  label: string;
  children: React.ReactNode;
}

//utils...
const KRW_FORMATTER = new Intl.NumberFormat('ko-KR');
const formatPrice = (price: number) => {
  return KRW_FORMATTER.format(price) + '원';
};

const InfoRow = ({ label, children }: InfoRowProps) => {
  return (
    <Box sx={{ display: 'contents' }}>
      <Typography component="dt" variant="body2" sx={{ fontWeight: 600 }}>
        {label}
      </Typography>

      <Box component="dd">{children}</Box>
    </Box>
  );
};

const ShowInfoRow = ({ item }: ShowInfoRowProps) => {
  return (
    <Box
      component="dl"
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '7.2rem 1fr', sm: '9rem 1fr' },
        columnGap: 2,
        rowGap: 1.5,
      }}
    >
      <InfoRow label="장소">
        <Typography variant="body2">{item.venue.name}</Typography>
      </InfoRow>
      <InfoRow label="공연기간">
        <Typography variant="body2">
          {item.startDate} ~ {item.endDate}
        </Typography>
      </InfoRow>
      <InfoRow label="공연시간">
        <Typography variant="body2">150분</Typography>
      </InfoRow>
      <InfoRow label="관람연령">
        <Typography variant="body2">8세 이상 관람가능</Typography>
      </InfoRow>
      <InfoRow label="가격">
        <Stack spacing={0.5}>
          <Stack component="ul" spacing={0.25}>
            {item.grades.map((grade) => (
              <Stack key={grade.id} component="li" direction="row" spacing={1}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {grade.gradeName}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  {formatPrice(grade.price)}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </InfoRow>
      <InfoRow label="혜택">
        <InstallmentTooltip />

        <Stack spacing={0.8}>
          <Stack
            component={Link}
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            direction="row"
            alignItems="center"
            spacing={1}
          >
            <BenefitBadge
              sx={{
                bgcolor: '#1976d2',
              }}
            >
              ONE카드
            </BenefitBadge>
            <Typography sx={{ fontSize: 13, color: '#555' }}>
              ONE 카드 티켓 10만원 할인쿠폰
            </Typography>
            <ChevronRight sx={{ fontSize: 14 }} />
          </Stack>
          <Stack
            component={Link}
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            direction="row"
            alignItems="center"
            spacing={1}
          >
            <BenefitBadge
              sx={{
                bgcolor: '#fbc02d',
              }}
            >
              t:ping
            </BenefitBadge>
            <Typography sx={{ fontSize: 13, color: '#555' }}>
              가입하고 중복할인 쿠폰받기
            </Typography>
            <ChevronRight sx={{ fontSize: 14 }} />
          </Stack>
        </Stack>
      </InfoRow>
      <InfoRow label="프로모션">
        <Stack
          component={Link}
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          direction="row"
          alignItems="center"
          spacing={1}
        >
          <Image
            src="/images/ico-kakaopay.png"
            alt="카카오페이 로고 이미지"
            width={42}
            height={26}
          />
          <Typography sx={{ fontSize: 13, color: '#555' }}>
            카카오머니 결제 시 4천원 즉시할인(선착순)
          </Typography>
          <ChevronRight sx={{ fontSize: 14 }} />
        </Stack>
      </InfoRow>
      <InfoRow label="유의사항">
        <Typography variant="body2">
          2026년 01월 13일 20시 00분~2026년 01월 20일 20시 00분까지 무통장입금
          결제가 불가능합니다.
        </Typography>
      </InfoRow>
    </Box>
  );
};

export default ShowInfoRow;
