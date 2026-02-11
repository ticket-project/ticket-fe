'use client';

import 'dayjs/locale/ko';

import React, { useState } from 'react';

import {
  Favorite,
  FavoriteBorder,
  Share,
  Facebook,
  ChevronRight,
  CalendarToday,
  AccessTime,
  LocationOn,
  ConfirmationNumber,
} from '@mui/icons-material';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Chip,
  Divider,
  Stack,
  Paper,
  IconButton,
  Tab,
  Tabs,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function ConcertDetailPage() {
  const [liked, setLiked] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(
    dayjs('2026-01-24')
  );
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleDateChange = (newDate: Dayjs | null) => {
    setSelectedDate(newDate);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
      <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', py: 4 }}>
        <Container maxWidth="lg">
          {/* 타이틀 */}
          <Typography
            variant="h4"
            component="h1"
            sx={{ mb: 4, fontWeight: 700 }}
          >
            2026 다비치 콘서트 &lt;TIME CAPSULE : 시간을 잇다&gt;
          </Typography>

          <Grid container spacing={3}>
            {/* 왼쪽 컨텐츠 영역 */}
            <Grid item xs={12} md={8}>
              {/* 메인 이미지 및 기본 정보 */}
              <Card sx={{ mb: 3 }}>
                <Grid container>
                  <Grid item xs={12} sm={5}>
                    <CardMedia
                      component="img"
                      image="/api/placeholder/400/500"
                      alt="10CM 콘서트 포스터"
                      sx={{ height: '100%', objectFit: 'cover' }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={7}>
                    <CardContent sx={{ p: 3 }}>
                      <Stack spacing={2}>
                        {/* 좋아요 및 공유 버튼 */}
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            mb: 2,
                          }}
                        >
                          <IconButton
                            onClick={() => setLiked(!liked)}
                            color="primary"
                          >
                            {liked ? <Favorite /> : <FavoriteBorder />}
                          </IconButton>
                          <Typography variant="body2" color="text.secondary">
                            저장하기 2,565
                          </Typography>
                          <IconButton color="primary" sx={{ ml: 1 }}>
                            <Facebook />
                          </IconButton>
                          <IconButton color="primary">
                            <Share />
                          </IconButton>
                        </Box>

                        {/* 공연 정보 */}
                        <Box>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            gutterBottom
                          >
                            장소
                          </Typography>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 0.5,
                            }}
                          >
                            <Typography variant="body1">
                              올림픽공원 KSPO DOME
                            </Typography>
                            <ChevronRight fontSize="small" />
                          </Box>
                        </Box>

                        <Box>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            gutterBottom
                          >
                            공연기간
                          </Typography>
                          <Typography variant="body1">
                            2026.01.24 ~ 2026.01.25
                          </Typography>
                        </Box>

                        <Box>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            gutterBottom
                          >
                            관람시간
                          </Typography>
                          <Typography variant="body1">120분</Typography>
                        </Box>

                        <Box>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            gutterBottom
                          >
                            관람연령
                          </Typography>
                          <Typography variant="body1">만 8세이상</Typography>
                        </Box>

                        <Box>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            gutterBottom
                          >
                            가격
                          </Typography>
                          <Stack spacing={0.5}>
                            <Typography variant="body1">
                              VIP석 165,000원
                            </Typography>
                            <Typography variant="body1">
                              R석 154,000원
                            </Typography>
                            <Typography variant="body1">
                              S석 143,000원
                            </Typography>
                          </Stack>
                        </Box>

                        <Box>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            gutterBottom
                          >
                            예매
                          </Typography>
                          <Chip
                            label="부킹닷컴"
                            size="small"
                            color="primary"
                            sx={{ mr: 1 }}
                          />
                          <Box sx={{ mt: 1 }}>
                            <Typography
                              variant="body2"
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.5,
                              }}
                            >
                              VOL, FUN, 다비 VOL의 할인정보
                              <ChevronRight fontSize="small" />
                            </Typography>
                            <Chip
                              label="예매"
                              color="warning"
                              size="small"
                              sx={{ mt: 1, mr: 1 }}
                            />
                            <Typography variant="body2" component="span">
                              기타으로 초청하신 보성자까지
                            </Typography>
                          </Box>
                        </Box>

                        <Box>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            gutterBottom
                          >
                            프로모션
                          </Typography>
                          <Chip
                            label="카카"
                            color="warning"
                            size="small"
                            sx={{ mr: 1 }}
                          />
                          <Typography variant="body2" component="span">
                            카카오페이 결제 시 최대 5천원할인(결제금액 5만원
                            이상)
                          </Typography>
                        </Box>

                        <Box>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            gutterBottom
                          >
                            배송
                          </Typography>
                          <Typography variant="body2">
                            1일 2일까지 → 1일 7일(금) 현장발송
                            <br />
                            배송료 0원
                          </Typography>
                        </Box>

                        <Box>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            gutterBottom
                          >
                            판매자제
                          </Typography>
                          <Typography variant="body2">
                            2026년 01월 12일 20시 00분~2026년 01일 20일 21시
                            00분까지
                            <br />내 티켓보관함으로 즉시 발급됩니다.
                          </Typography>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Grid>
                </Grid>
              </Card>

              {/* 탭 메뉴 */}
              <Paper sx={{ mb: 3 }}>
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  variant="fullWidth"
                  sx={{ borderBottom: 1, borderColor: 'divider' }}
                >
                  <Tab label="공연정보" />
                  <Tab label="판매정보" />
                </Tabs>

                <TabPanel value={tabValue} index={0}>
                  {/* 공연시간 정보 */}
                  <Box sx={{ mb: 4 }}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ fontWeight: 600 }}
                    >
                      공연시간 정보
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      매회가시간: 공연기간/날짜, 공연 시작일까지 11시반동안 공개
                      예정 상세부
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemText primary="2026년 2월 14일(금) 18시" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="2026년 2월 15일(토) 16시" />
                      </ListItem>
                    </List>
                  </Box>

                  {/* 공지사항 */}
                  <Box sx={{ mb: 4 }}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ fontWeight: 600 }}
                    >
                      공지사항
                    </Typography>
                    <Typography variant="body2" color="primary" paragraph>
                      ※ 반복 판매 및 타인신분증으로 본인의 모신 안보면, 본
                      공연은 예매부터 실명으로 예약되니다. 반드시 본인의 환전
                      아내에서를 규정 예매하는 예매입니다.
                    </Typography>
                    <Typography
                      variant="body2"
                      paragraph
                      sx={{ color: 'primary.main' }}
                    >
                      ※ 안박 등톡 등 타인으로부터 유해알람받신를한, 같아서 입은
                      시기에 공연일 최근 요청 된 시점에 확정될 수 있습니다. 자주
                      신별후 자컴 입일 발급 시천 앱산판매 설맹, 환불대리 칸덴
                      당일 허용역 예매하니다.
                    </Typography>
                    <Typography
                      variant="body2"
                      paragraph
                      sx={{ color: 'primary.main' }}
                    >
                      ※총 공연은 다만 판매 등록 외 재판에는 아셔 반정식 안심치
                      알고 발생한 가주달니다.
                    </Typography>
                    <Typography
                      variant="body2"
                      paragraph
                      sx={{ color: 'primary.main' }}
                    >
                      ※극장의 주차장은 유료, 안티라비 이치,
                      이전이다아트(신청)에, VDL, 모든편 공연장에서시 구동합니다.
                      드닌 선택판매, 사장면배칭 등 공연안내석 시험 가동)
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="body2" fontWeight={600} gutterBottom>
                      [특이사항 예약 안내]
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ※ 특이아픔 근물호 VDL, 근방 고등학(면금15454~155달면 항복
                      안판언와주 가주달니다 (그래원의 공장으신 요인 30뒤~요준
                      5쌈)
                      <br />※ 자작비 센공 판단 상반이원디다 날 펄이나재 아획
                      안낙 측경은 주시가 막달니다.
                    </Typography>
                    <Typography
                      variant="body2"
                      paragraph
                      sx={{ color: 'primary.main', mt: 2 }}
                    >
                      ※ 다영 공연, 자측 등 방매법 안판뇌는 자문록 등 안만의
                      참가능네다니다, 이내으아에 주재혜서시기 먹달니다.
                    </Typography>
                  </Box>

                  {/* 공연사진 / 출연진정보 */}
                  <Box sx={{ mb: 4 }}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ fontWeight: 600 }}
                    >
                      공연사진 / 출연진정보
                    </Typography>
                    <Box
                      component="img"
                      src="/api/placeholder/600/800"
                      alt="10CM"
                      sx={{ width: '100%', maxWidth: 400, borderRadius: 1 }}
                    />
                  </Box>

                  {/* 관련공연 */}
                  <Box>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ fontWeight: 600 }}
                    >
                      관련공연
                    </Typography>
                    <Card>
                      <CardMedia
                        component="img"
                        image="/api/placeholder/300/200"
                        alt="관련공연"
                        sx={{ height: 200, objectFit: 'cover' }}
                      />
                      <CardContent>
                        <Typography variant="body2" color="text.secondary">
                          2026.03.02~2026.03.03
                        </Typography>
                        <Typography variant="body1" fontWeight={600}>
                          2026 10CM Asia Tour ('To 10CM: Chapter 1' in Dae...
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>
                </TabPanel>

                <TabPanel value={tabValue} index={1}>
                  <Typography variant="body1">
                    판매정보 내용이 들어갑니다.
                  </Typography>
                </TabPanel>
              </Paper>
            </Grid>

            {/* 우측 예매 패널 (Sticky) */}
            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  position: 'sticky',
                  top: 16,
                  p: 3,
                }}
              >
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  관람일
                </Typography>

                {/* 달력 */}
                <Box sx={{ mb: 2 }}>
                  <DateCalendar
                    value={selectedDate}
                    onChange={handleDateChange}
                    views={['day']}
                    sx={{
                      width: '100%',
                      '& .MuiPickersCalendarHeader-root': {
                        paddingLeft: 1,
                        paddingRight: 1,
                      },
                      '& .MuiDayCalendar-header': {
                        justifyContent: 'space-around',
                      },
                      '& .MuiPickersDay-root': {
                        fontSize: '0.875rem',
                      },
                    }}
                  />
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* 회차 선택 */}
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  sx={{ fontWeight: 600 }}
                >
                  회차
                </Typography>
                <Stack spacing={1} sx={{ mb: 3 }}>
                  <Button
                    variant="outlined"
                    fullWidth
                    sx={{
                      justifyContent: 'space-between',
                      textTransform: 'none',
                      py: 1.5,
                      borderColor: 'primary.main',
                      color: 'text.primary',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AccessTime fontSize="small" />
                      <Typography variant="body2">08:00</Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      298 잔여석
                    </Typography>
                  </Button>
                </Stack>

                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                  sx={{ mb: 3 }}
                >
                  수어해 안된 A에선즉 목석관을 예매부르니다.
                </Typography>

                {/* 예매하기 버튼 */}
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  sx={{
                    mb: 1,
                    py: 1.5,
                    bgcolor: '#F59E0B',
                    '&:hover': {
                      bgcolor: '#D97706',
                    },
                    fontWeight: 600,
                  }}
                >
                  예매하기
                </Button>

                <Button
                  variant="outlined"
                  fullWidth
                  size="large"
                  sx={{
                    py: 1.5,
                    borderColor: '#F59E0B',
                    color: '#F59E0B',
                    '&:hover': {
                      borderColor: '#D97706',
                      bgcolor: 'rgba(245, 158, 11, 0.04)',
                    },
                    fontWeight: 600,
                  }}
                >
                  BOOKING / 부킹클럽
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </LocalizationProvider>
  );
}

<Stack
  key={iidx}
  direction="row"
  alignItems="center"
  spacing={1}
  sx={{ cursor: 'pointer' }}
>
  <Box
    sx={{
      bgcolor: item.badgeBg,
      color: 'white',
      px: 0.6,
      py: 0.1,
      borderRadius: '3px',
      fontSize: '10px',
      fontWeight: 'bold',
    }}
  >
    {item.badge}
  </Box>
  <Typography sx={{ fontSize: '12px', color: '#555' }}>{item.text}</Typography>
  <ChevronRight size={12} color="#bbb" />
</Stack>;
