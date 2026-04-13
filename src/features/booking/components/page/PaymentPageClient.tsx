'use client';

import 'dayjs/locale/ko';

import Image from 'next/image';
import { useState } from 'react';

import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { enqueueSnackbar } from 'notistack';

import { SeatMapItem } from '../../types';

import QueryBoundary from '@/components/common/QueryBoundary';
import TopInfoBar from '@/features/booking/components/common/TopInfoBar';
import {
  usePerformanceSummary,
  useSeatMap,
} from '@/features/booking/hooks/useSeatQueries';
import { useAuthStore } from '@/store/authStore';
import { useBookingStore } from '@/store/bookingStore';

import { cancelOrder } from '../../api';
import useOrderLeaveGuard from '../../hooks/useOrderLeaveGuard';
import { formatKRW } from '../../utils';

interface PaymentPageClientProps {
  holdExpiresAt?: string;
  orderKey: string;
  performanceId: number;
  showId?: number;
}

const DELIVERY_FEE = 3700;

const deliveryOptions = [
  {
    value: 'onsite',
    label: '현장수령',
    description: '공연 시작 전 매표소에서 예매 내역 확인 후 수령',
    icon: StorefrontOutlinedIcon,
  },
  {
    value: 'mobile',
    label: '모바일티켓',
    description: '예매 완료 후 모바일 티켓으로 바로 입장 가능',
    icon: PhoneIphoneOutlinedIcon,
  },
  {
    value: 'delivery',
    label: '배송',
    description: `예매권 배송비 ${formatKRW(DELIVERY_FEE)} 추가`,
    icon: LocalShippingOutlinedIcon,
  },
] as const;

const paymentOptions = [
  {
    value: 'kakaopay',
    label: '카카오페이머니',
    description: '간편하게 결제하고 카카오페이 혜택을 적용할 수 있습니다.',
  },
  {
    value: 'card',
    label: '신용/체크카드',
    description: '국내 주요 카드사 결제를 지원합니다.',
  },
  {
    value: 'bank',
    label: '무통장입금',
    description: '입금 기한 내 미입금 시 예매가 자동 취소됩니다.',
  },
] as const;

const agreementItems = [
  {
    key: 'cancelPolicy',
    label: '[필수] 취소수수료 및 환불규정에 동의합니다.',
  },
  {
    key: 'personalInfo',
    label: '[필수] 개인정보 수집 및 이용에 동의합니다.',
  },
  {
    key: 'thirdParty',
    label: '[필수] 예매 확인을 위한 개인정보 제3자 제공에 동의합니다.',
  },
] as const;

const sectionCardSx = {
  border: '1px solid',
  borderColor: 'grey.200',
  borderRadius: '20px',
  backgroundColor: '#fff',
  p: { xs: '2rem', md: '2.8rem' },
};

const optionCardBaseSx = {
  p: { xs: '1.4rem', md: '1.8rem' },
  borderRadius: '16px',
  border: '1px solid',
  borderColor: 'grey.200',
  cursor: 'pointer',
  transition: 'border-color 0.2s ease, background-color 0.2s ease',
};

const inputSx = {
  '& .MuiOutlinedInput-root': {
    border: '1px solid',
    borderColor: 'grey.200',
    borderRadius: '14px',
    backgroundColor: '#fff',
    fontSize: '1.5rem',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    '& fieldset': {
      border: 0,
    },
    '&:hover': {
      borderColor: 'grey.400',
    },
    '&.Mui-focused': {
      borderColor: 'primary.main',
      boxShadow: '0 0 0 4px rgba(220, 38, 38, 0.08)',
    },
  },
  '& .MuiInputBase-input': {
    px: '1.6rem',
    py: '1.5rem',
  },
};

const getSeatLabel = (seat: SeatMapItem) =>
  `${seat.floor}층 ${seat.section}구역 ${seat.row}열 ${seat.col}번`;

const PaymentPageClient = ({
  showId,
  performanceId,
  holdExpiresAt,
  orderKey,
}: PaymentPageClientProps) => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const selectedSeatIds = useBookingStore((state) => state.selectedSeatIds);
  const resetBookingState = useBookingStore((state) => state.resetBookingState);
  const summaryQuery = usePerformanceSummary(performanceId);
  const seatMapQuery = useSeatMap(showId ?? 0);
  const [deliveryMethod, setDeliveryMethod] =
    useState<(typeof deliveryOptions)[number]['value']>('mobile');
  const [paymentMethod, setPaymentMethod] =
    useState<(typeof paymentOptions)[number]['value']>('kakaopay');
  const [ordererName, setOrdererName] = useState('');
  const [ordererPhone, setOrdererPhone] = useState('');
  const [ordererEmail, setOrdererEmail] = useState('');
  const [agreements, setAgreements] = useState({
    cancelPolicy: false,
    personalInfo: false,
    thirdParty: false,
  });

  const handleCancelPendingOrder = async () => {
    try {
      await cancelOrder(orderKey, accessToken);
      resetBookingState();
    } catch (error) {
      console.error('주문 취소 API 호출에 실패했습니다.', error);
      enqueueSnackbar('좌석 선점 해제에 실패했습니다.', {
        variant: 'error',
      });
      throw error;
    }
  };

  useOrderLeaveGuard({
    accessToken,
    hasPendingOrder: Boolean(orderKey),
    onConfirmLeave: handleCancelPendingOrder,
    orderKey,
  });

  const seatById = new Map(
    seatMapQuery.data?.map((seat) => [seat.id, seat]) ?? []
  );
  const selectedSeats = selectedSeatIds
    .map((seatId) => seatById.get(seatId))
    .filter((seat): seat is SeatMapItem => seat != null);
  const ticketPrice = selectedSeats.reduce(
    (total, seat) => total + seat.grade.price,
    0
  );
  const shippingFee = deliveryMethod === 'delivery' ? DELIVERY_FEE : 0;
  const totalPrice = ticketPrice + shippingFee;
  const hasRequiredFields = Boolean(
    ordererName.trim() && ordererPhone.trim() && ordererEmail.trim()
  );
  const hasAllAgreements = agreementItems.every(
    (item) => agreements[item.key as keyof typeof agreements]
  );
  const isSubmitDisabled =
    !selectedSeatIds.length || !hasRequiredFields || !hasAllAgreements;

  const isAllChecked = agreementItems.every(
    (item) => agreements[item.key as keyof typeof agreements]
  );

  const handleToggleAgreement = (key: keyof typeof agreements) => {
    setAgreements((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleToggleAllAgreements = () => {
    const nextValue = !isAllChecked;

    setAgreements({
      cancelPolicy: nextValue,
      personalInfo: nextValue,
      thirdParty: nextValue,
    });
  };

  const handleSubmit = () => {
    enqueueSnackbar('결제 기능은 준비 중입니다. 화면만 먼저 구성했습니다.', {
      variant: 'info',
    });
  };

  return (
    <Box
      sx={{
        height: {
          xs: 'calc(100dvh - var(--mobile-header-height))',
          md: 'calc(100dvh - var(--simple-header-height) - 2px)',
        },
        minHeight: 0,
        display: 'grid',
        gridTemplateRows: '60px minmax(0,1fr)',
      }}
    >
      <QueryBoundary query={summaryQuery}>
        {(item) => (
          <TopInfoBar
            bookingExpiresAt={holdExpiresAt}
            performanceSummary={item}
          />
        )}
      </QueryBoundary>
      <Box
        sx={{
          overflowY: 'auto',
          backgroundColor: 'grey.50',
        }}
      >
        <Container
          maxWidth={false}
          sx={{
            py: { xs: '2rem', md: '3.2rem' },
          }}
        >
          <Box
            sx={{
              display: 'grid',
              gap: { xs: '1.6rem', md: '2.4rem' },
              alignItems: 'start',
              gridTemplateColumns: {
                xs: '1fr',
                lg: 'minmax(0, 1fr) 38rem',
              },
            }}
          >
            <Stack spacing={{ xs: 1.6, md: 2.4 }}>
              <Box sx={sectionCardSx}>
                <Stack spacing={2}>
                  <Box>
                    <Typography
                      component="h2"
                      sx={{ fontSize: '2.2rem', fontWeight: 700 }}
                    >
                      수령방법
                    </Typography>
                    <Typography
                      sx={{
                        mt: '0.8rem',
                        fontSize: '1.4rem',
                        color: 'text.secondary',
                      }}
                    >
                      티켓 수령 방법을 선택해 주세요.
                    </Typography>
                  </Box>
                  <Stack spacing={1.2}>
                    {deliveryOptions.map((option) => {
                      const Icon = option.icon;
                      const isSelected = deliveryMethod === option.value;

                      return (
                        <Box
                          key={option.value}
                          role="button"
                          tabIndex={0}
                          onClick={() => setDeliveryMethod(option.value)}
                          onKeyDown={(event) => {
                            if (event.key === 'Enter' || event.key === ' ') {
                              event.preventDefault();
                              setDeliveryMethod(option.value);
                            }
                          }}
                          sx={{
                            ...optionCardBaseSx,
                            borderColor: isSelected
                              ? 'primary.main'
                              : 'grey.200',
                            backgroundColor: isSelected
                              ? 'primary.light'
                              : '#fff',
                          }}
                        >
                          <Stack
                            direction="row"
                            spacing={1.6}
                            alignItems="center"
                          >
                            <Box
                              sx={{
                                width: '4.8rem',
                                height: '4.8rem',
                                borderRadius: '14px',
                                backgroundColor: '#fff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: isSelected
                                  ? 'primary.main'
                                  : 'text.secondary',
                              }}
                            >
                              <Icon sx={{ fontSize: '2.4rem' }} />
                            </Box>
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                              <Typography
                                sx={{ fontSize: '1.7rem', fontWeight: 700 }}
                              >
                                {option.label}
                              </Typography>
                              <Typography
                                sx={{
                                  mt: '0.4rem',
                                  fontSize: '1.4rem',
                                  color: 'text.secondary',
                                }}
                              >
                                {option.description}
                              </Typography>
                            </Box>
                          </Stack>
                        </Box>
                      );
                    })}
                  </Stack>
                </Stack>
              </Box>

              <Box sx={sectionCardSx}>
                <Stack spacing={2}>
                  <Box>
                    <Typography
                      component="h2"
                      sx={{ fontSize: '2.2rem', fontWeight: 700 }}
                    >
                      주문자 정보
                    </Typography>
                    <Typography
                      sx={{
                        mt: '0.8rem',
                        fontSize: '1.4rem',
                        color: 'text.secondary',
                      }}
                    >
                      입력하신 정보는 공연장에서 예매 확인을 위해 사용될 수
                      있습니다.
                    </Typography>
                  </Box>
                  <Stack spacing={1.2}>
                    <TextField
                      placeholder="이름을 입력해 주세요"
                      value={ordererName}
                      onChange={(event) => setOrdererName(event.target.value)}
                      sx={inputSx}
                    />
                    <TextField
                      placeholder="연락처를 입력해 주세요"
                      value={ordererPhone}
                      onChange={(event) => setOrdererPhone(event.target.value)}
                      sx={inputSx}
                    />
                    <TextField
                      type="email"
                      placeholder="이메일을 입력해 주세요"
                      value={ordererEmail}
                      onChange={(event) => setOrdererEmail(event.target.value)}
                      sx={inputSx}
                    />
                  </Stack>
                </Stack>
              </Box>

              <Box sx={sectionCardSx}>
                <Stack spacing={2}>
                  <Box>
                    <Typography
                      component="h2"
                      sx={{ fontSize: '2.2rem', fontWeight: 700 }}
                    >
                      결제수단
                    </Typography>
                    <Typography
                      sx={{
                        mt: '0.8rem',
                        fontSize: '1.4rem',
                        color: 'text.secondary',
                      }}
                    >
                      원하는 결제수단을 선택해 주세요.
                    </Typography>
                  </Box>
                  <Stack spacing={1.2}>
                    {paymentOptions.map((option) => {
                      const isSelected = paymentMethod === option.value;

                      return (
                        <Box
                          key={option.value}
                          role="button"
                          tabIndex={0}
                          onClick={() => setPaymentMethod(option.value)}
                          onKeyDown={(event) => {
                            if (event.key === 'Enter' || event.key === ' ') {
                              event.preventDefault();
                              setPaymentMethod(option.value);
                            }
                          }}
                          sx={{
                            ...optionCardBaseSx,
                            borderColor: isSelected
                              ? 'primary.main'
                              : 'grey.200',
                            backgroundColor: isSelected ? '#fff7f7' : '#fff',
                          }}
                        >
                          <Stack
                            direction="row"
                            spacing={1.6}
                            alignItems="center"
                          >
                            {option.value === 'kakaopay' && (
                              <Image
                                src="/images/ico-kakaopay.png"
                                alt="카카오페이 로고 이미지"
                                width={42}
                                height={26}
                                style={{ width: 'auto', flexShrink: 0 }}
                              />
                            )}
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                              <Typography
                                sx={{ fontSize: '1.7rem', fontWeight: 700 }}
                              >
                                {option.label}
                              </Typography>
                              <Typography
                                sx={{
                                  mt: '0.4rem',
                                  fontSize: '1.4rem',
                                  color: 'text.secondary',
                                }}
                              >
                                {option.description}
                              </Typography>
                            </Box>
                          </Stack>
                        </Box>
                      );
                    })}
                  </Stack>
                </Stack>
              </Box>

              <Box sx={sectionCardSx}>
                <Stack spacing={1.6}>
                  <Typography
                    component="h2"
                    sx={{ fontSize: '2.2rem', fontWeight: 700 }}
                  >
                    예매자동의
                  </Typography>
                  <Box
                    sx={{
                      borderRadius: '16px',
                      backgroundColor: 'grey.50',
                      p: { xs: '1.6rem', md: '2rem' },
                    }}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isAllChecked}
                          onChange={handleToggleAllAgreements}
                          sx={{ p: 0, pr: '1rem' }}
                        />
                      }
                      label="필수 약관 전체 동의"
                      sx={{
                        m: 0,
                        alignItems: 'flex-start',
                        '& .MuiFormControlLabel-label': {
                          fontSize: '1.6rem',
                          fontWeight: 700,
                        },
                      }}
                    />
                    <Typography
                      sx={{
                        mt: '0.8rem',
                        pl: '3.4rem',
                        fontSize: '1.3rem',
                        color: 'text.secondary',
                        lineHeight: 1.5,
                      }}
                    >
                      동의 항목을 모두 확인하신 후 예매를 진행해 주세요.
                    </Typography>
                  </Box>
                  <Stack spacing={0.4}>
                    {agreementItems.map((item) => (
                      <FormControlLabel
                        key={item.key}
                        control={
                          <Checkbox
                            checked={
                              agreements[item.key as keyof typeof agreements]
                            }
                            onChange={() =>
                              handleToggleAgreement(
                                item.key as keyof typeof agreements
                              )
                            }
                            sx={{ p: 0, pr: '1rem' }}
                          />
                        }
                        label={item.label}
                        sx={{
                          m: 0,
                          py: '0.8rem',
                          alignItems: 'flex-start',
                          '& .MuiFormControlLabel-label': {
                            fontSize: '1.5rem',
                            lineHeight: 1.5,
                          },
                        }}
                      />
                    ))}
                  </Stack>
                  <Alert
                    severity="info"
                    sx={{
                      alignItems: 'center',
                      borderRadius: '14px',
                      fontSize: '1.3rem',
                      color: 'text.secondary',
                    }}
                  >
                    배송 선택 시 공연일 기준 배송 가능 기간에 따라 수령방법이
                    제한될 수 있습니다.
                  </Alert>
                </Stack>
              </Box>
            </Stack>

            <Box
              sx={{
                position: { lg: 'sticky' },
                top: { lg: '2.4rem' },
              }}
            >
              <Box sx={sectionCardSx}>
                <Stack spacing={2}>
                  <Typography
                    component="h2"
                    sx={{ fontSize: '2.2rem', fontWeight: 700 }}
                  >
                    결제 요약
                  </Typography>

                  <Stack
                    spacing={1.2}
                    sx={{
                      p: '1.8rem',
                      borderRadius: '16px',
                      backgroundColor: 'grey.50',
                    }}
                  >
                    <Typography sx={{ fontSize: '1.6rem', fontWeight: 700 }}>
                      공연 정보
                    </Typography>
                    <QueryBoundary query={summaryQuery}>
                      {(item) => (
                        <Stack spacing={0.8}>
                          <Typography
                            sx={{ fontSize: '1.5rem', fontWeight: 700 }}
                          >
                            {item.title}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: '1.4rem',
                              color: 'text.secondary',
                            }}
                          >
                            {item.region}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: '1.4rem',
                              color: 'text.secondary',
                            }}
                          >
                            {dayjs(item.startTime)
                              .locale('ko')
                              .format('YYYY.MM.DD(ddd) HH:mm')}
                          </Typography>
                        </Stack>
                      )}
                    </QueryBoundary>
                  </Stack>

                  <Stack spacing={1.2}>
                    <Typography sx={{ fontSize: '1.6rem', fontWeight: 700 }}>
                      선택 좌석
                    </Typography>
                    <Stack
                      spacing={1}
                      sx={{
                        maxHeight: '22rem',
                        overflowY: 'auto',
                        pr: '0.4rem',
                      }}
                    >
                      {selectedSeats.length ? (
                        selectedSeats.map((seat) => (
                          <Box
                            key={seat.id}
                            sx={{
                              p: '1.4rem',
                              borderRadius: '14px',
                              backgroundColor: 'grey.50',
                            }}
                          >
                            <Typography
                              sx={{ fontSize: '1.5rem', fontWeight: 700 }}
                            >
                              {seat.grade.name}
                            </Typography>
                            <Typography
                              sx={{
                                mt: '0.4rem',
                                fontSize: '1.3rem',
                                color: 'text.secondary',
                              }}
                            >
                              {getSeatLabel(seat)}
                            </Typography>
                            <Typography
                              sx={{
                                mt: '0.6rem',
                                fontSize: '1.4rem',
                                fontWeight: 700,
                              }}
                            >
                              {formatKRW(seat.grade.price)}
                            </Typography>
                          </Box>
                        ))
                      ) : (
                        <Box
                          sx={{
                            p: '1.6rem',
                            borderRadius: '14px',
                            backgroundColor: 'grey.50',
                          }}
                        >
                          <Typography
                            sx={{ fontSize: '1.4rem', color: 'text.secondary' }}
                          >
                            {selectedSeatIds.length
                              ? '선택 좌석 정보를 불러오는 중입니다.'
                              : '선택된 좌석이 없습니다.'}
                          </Typography>
                        </Box>
                      )}
                    </Stack>
                  </Stack>

                  <Stack spacing={1}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography
                        sx={{ fontSize: '1.4rem', color: 'text.secondary' }}
                      >
                        티켓금액
                      </Typography>
                      <Typography sx={{ fontSize: '1.5rem', fontWeight: 700 }}>
                        {formatKRW(ticketPrice)}
                      </Typography>
                    </Stack>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography
                        sx={{ fontSize: '1.4rem', color: 'text.secondary' }}
                      >
                        수령방법
                      </Typography>
                      <Typography sx={{ fontSize: '1.5rem', fontWeight: 700 }}>
                        {
                          deliveryOptions.find(
                            (option) => option.value === deliveryMethod
                          )?.label
                        }
                      </Typography>
                    </Stack>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography
                        sx={{ fontSize: '1.4rem', color: 'text.secondary' }}
                      >
                        배송비
                      </Typography>
                      <Typography sx={{ fontSize: '1.5rem', fontWeight: 700 }}>
                        {shippingFee ? formatKRW(shippingFee) : '무료'}
                      </Typography>
                    </Stack>
                  </Stack>

                  <Box
                    sx={{
                      pt: '1.8rem',
                      borderTop: '1px solid',
                      borderTopColor: 'grey.200',
                    }}
                  >
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography sx={{ fontSize: '1.5rem', fontWeight: 700 }}>
                        총 결제금액
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '2.6rem',
                          fontWeight: 800,
                          color: 'primary.main',
                        }}
                      >
                        {formatKRW(totalPrice)}
                      </Typography>
                    </Stack>
                  </Box>

                  <Button
                    variant="contained"
                    fullWidth
                    disabled={isSubmitDisabled}
                    onClick={handleSubmit}
                    sx={{
                      height: '5.6rem',
                      borderRadius: '16px',
                      fontSize: '1.7rem',
                      fontWeight: 700,
                      color: '#fff',
                      boxShadow: 'none',
                    }}
                  >
                    결제하기
                  </Button>
                </Stack>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default PaymentPageClient;
