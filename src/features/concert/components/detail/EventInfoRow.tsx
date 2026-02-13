'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { ChevronRight, PlayArrow } from '@mui/icons-material';
import {
  Box,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';

import { ConcertDetail } from '@/features/concert/types';

import Tooltip from '@/components/ui/Tooltip';

const INSTALLMENT_DATA = [
  {
    card: '비씨카드',
    plan: '2~5개월',
    condition: '5만원 이상 결제 시 (하나 BC, Non-bc카드 제외)',
  },
  { card: '우리카드', plan: '2~5개월', condition: '5만원 이상 결제 시' },
  { card: '롯데카드', plan: '2~5개월', condition: '5만원 이상 결제 시' },
  { card: '하나카드', plan: '2~4개월', condition: '5만원 이상 결제 시' },
  { card: '국민카드', plan: '2~3개월', condition: '5만원 이상 결제 시' },
  { card: '현대카드', plan: '2~3개월', condition: '5만원 이상 결제 시' },
  { card: '신한카드', plan: '2~3개월', condition: '5만원 이상 결제시' },
  { card: '삼성카드', plan: '2~3개월', condition: '5만원 이상 결제 시' },
  { card: '농협카드', plan: '2~3개월', condition: '5만원 이상 결제 시' },
];

function InfoRow({ label, children }) {
  return (
    <>
      {/* display: contents 로 dt/dd를 같은 grid row에 자연스럽게 배치 */}
      <Box sx={{ display: 'contents' }}>
        <Typography component="dt" variant="body2" sx={{ fontWeight: 600 }}>
          {label}
        </Typography>

        <Box component="dd">{children}</Box>
      </Box>
    </>
  );
}

const EventInfoRow = ({ item }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

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
        {/* <Button variant="text" sx={{ fontWeight: 600 }}>
          {item.venue.name}
          <PlayArrow />
        </Button> */}
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
            <Stack component="li" direction="row" spacing={1}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                R석
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                132,000원
              </Typography>
            </Stack>
            <Stack component="li" direction="row" spacing={1}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                S석
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 700 }}>
                121,000원
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </InfoRow>
      <InfoRow label="혜택">
        <Tooltip
          placement="bottom-end"
          open={tooltipOpen}
          onClose={() => setTooltipOpen(false)}
          title={
            <Box sx={{ p: 1.8 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
                무이자할부 안내
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'grey.500',
                  mb: 1.5,
                  lineHeight: 1.4,
                }}
              >
                체크,법인,기업,즉시불,기프트카드 제외
                <br />
                무이자할부 결제 시, 카드 포인트 및 마일리지 적립제외
              </Typography>
              <Table
                size="small"
                sx={{
                  borderTop: 1,
                  borderColor: 'divider',
                }}
              >
                <TableBody>
                  {INSTALLMENT_DATA.map((row) => (
                    <TableRow key={row.card}>
                      <TableCell
                        component="th"
                        sx={{
                          bgcolor: 'grey.100',
                          fontWeight: 600,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {row.card}
                      </TableCell>
                      <TableCell sx={{ whiteSpace: 'nowrap' }}>
                        {row.plan}
                      </TableCell>
                      <TableCell sx={{ width: 150 }}>{row.condition}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          }
        >
          <Typography
            variant="body2"
            sx={{
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              mb: 1,
            }}
            onClick={() => setTooltipOpen(!tooltipOpen)}
          >
            무이자할부
            <PlayArrow sx={{ fontSize: 13, ml: 0.2, mt: -0.1 }} />
          </Typography>
        </Tooltip>

        <Stack spacing={0.8}>
          <Stack
            component={Link}
            href="#"
            direction="row"
            alignItems="center"
            spacing={1}
            target="_blank"
          >
            <Box
              sx={{
                bgcolor: '#1976d2',
                color: 'white',
                px: 0.4,
                py: 0.1,
                borderRadius: '3px',
                fontSize: 11,
                fontWeight: 800,
                whiteSpace: 'nowrap',
              }}
            >
              ONE카드
            </Box>
            <Typography sx={{ fontSize: 13, color: '#555' }}>
              ONE 카드 티켓 10만원 할인쿠폰
            </Typography>
            <ChevronRight sx={{ fontSize: 14 }} />
          </Stack>
          <Stack
            component={Link}
            href="#"
            direction="row"
            alignItems="center"
            spacing={1}
            target="_blank"
          >
            <Box
              sx={{
                bgcolor: '#fbc02d',
                color: 'white',
                px: 0.4,
                py: 0.1,
                borderRadius: '3px',
                fontSize: 11,
                fontWeight: 800,
                whiteSpace: 'nowrap',
              }}
            >
              t:ping
            </Box>
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
          direction="row"
          alignItems="center"
          spacing={1}
          target="_blank"
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

export default EventInfoRow;
