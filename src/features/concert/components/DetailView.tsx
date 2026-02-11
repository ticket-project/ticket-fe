import 'dayjs/locale/ko';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import {
  ChevronRight,
  FavoriteBorder,
  PlayArrow,
  Share,
  ExpandMore,
} from '@mui/icons-material';
/// 파일 위치 및 분리 다시 확읺하기
import {
  Box,
  Button,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import dayjs from 'dayjs';

import Tag from '@/components/ui/Tag';

import { SALE_TYPES } from '../constants';
import { ConcertDetail } from '../types';
type InfoRowProps = {
  label: string;
  children: React.ReactNode;
};

function CustomDay(props) {
  const { day, outsideCurrentMonth, selectedDate, ...other } = props;
  const date = day.date();
  const isSelected = date === selectedDate;
  const isAvailable = date === 24 || date === 25;
  const dayOfWeek = day.day();

  return (
    <PickersDay
      {...other}
      day={day}
      outsideCurrentMonth={outsideCurrentMonth}
      disabled={!isAvailable}
      sx={{
        fontSize: '12px',
        fontWeight: isSelected ? 700 : 500,
        bgcolor: isSelected ? '#ff5400 !important' : 'transparent',
        color: isSelected
          ? 'white !important'
          : !isAvailable
            ? '#ddd !important'
            : dayOfWeek === 0
              ? '#ff5400'
              : dayOfWeek === 6
                ? '#1976d2'
                : '#333',
        '&:hover': isAvailable && !isSelected ? { bgcolor: '#f5f5f5' } : {},
        '&.Mui-disabled': {
          color: '#ddd',
        },
      }}
    />
  );
}

function InfoRow({ label, children }: InfoRowProps) {
  return (
    <>
      {/* display: contents 로 dt/dd를 같은 grid row에 자연스럽게 배치 */}
      <Box sx={{ display: 'contents' }}>
        <Typography
          component="dt"
          variant="body2"
          sx={{ color: 'text.secondary', fontWeight: 600, m: 0 }}
        >
          {label}
        </Typography>

        <Box component="dd" sx={{ m: 0, minWidth: 0 }}>
          {children}
        </Box>
      </Box>
    </>
  );
}

function TabPanel({
  value,
  current,
  children,
}: {
  value: string;
  current: string;
  children: React.ReactNode;
}) {
  return (
    <Box
      role="tabpanel"
      id={`concert-tabpanel-${value}`}
      aria-labelledby={`concert-tab-${value}`}
      hidden={current !== value}
      sx={{ pt: 2 }}
    >
      {current === value ? children : null}
    </Box>
  );
}

// 퀵링크 넣기, aria-label 등 체킹
const DetailView = ({ item }: { item: ConcertDetail }) => {
  const [tab, setTab] = useState<'info' | 'sale'>('info');
  const [selectedDate, setSelectedDate] = useState(24);
  const [selectedSession, setSelectedSession] = useState(0);

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { md: 'minmax(0, 1fr) 360px' },
        gap: 2,
        alignItems: 'start',
      }}
    >
      {/* 좌측 */}
      <Box aria-label="공연 상세" sx={{ border: '1px solid green' }}>
        {/* 헤더 */}
        <Stack
          spacing={1.5}
          sx={{
            mb: 2.5,
            alignItems: 'start',
            borderBottom: 1,
            borderColor: 'divider',
            pb: 3,
          }}
        >
          <Tag
            label={SALE_TYPES[item.sale.type].label}
            color="primary"
            size="small"
          />
          <Typography variant="h2" sx={{ fontSize: '2.5rem', fontWeight: 700 }}>
            {item.title}
          </Typography>
        </Stack>

        {/* 기본정보 */}
        <Box
          sx={{
            p: { xs: 1.5, md: 2 },
            display: { xs: 'block', sm: 'grid' },
            gridTemplateColumns: { sm: '240px minmax(0,1fr)' },
            gap: 2,
          }}
        >
          {/* 포스터 + 찜 */}
          <Box>
            <Box>
              <Image
                // src={item.posterUrl}
                src="/images/dummy-poster.jpeg"
                alt={item.title}
                width={400}
                height={500}
              />
            </Box>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              {/* 설명 툴팁 추가 */}
              <Button startIcon={<FavoriteBorder />}>티켓캐스트 2,198</Button>
              <Button>
                {/* aria, sr-only */}
                <Share />
              </Button>
            </Stack>
          </Box>

          {/* 핵심정보 테이블 */}
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
              {/* 지도 모달 */}
              <Button sx={{ fontWeight: 600 }}>
                부산 벡스코 오디토리움
                <PlayArrow />
              </Button>
            </InfoRow>
            <InfoRow label="공연기간">
              <Typography variant="body2">2026.02.14 ~ 2026.02.15</Typography>
            </InfoRow>
            <InfoRow label="관람연령">
              <Typography variant="body2">8세 이상 관람가능</Typography>
            </InfoRow>
            <InfoRow label="가격">
              <Stack spacing={0.5}>
                {/* <Link href="#" underline="hover" sx={{ width: 'fit-content' }}>
                  전체가격보기
                </Link> */}
                <Stack component="ul" spacing={0.25}>
                  <Stack component="li" direction="row" spacing={1}>
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary' }}
                    >
                      R석
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      132,000원
                    </Typography>
                  </Stack>
                  <Stack component="li" direction="row" spacing={1}>
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary' }}
                    >
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
              <Button>
                무이자할부
                <PlayArrow />
              </Button>
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{ cursor: 'pointer' }}
              >
                <Box
                  sx={{
                    bgcolor: 'yellow',
                    color: 'white',
                    px: 0.6,
                    py: 0.1,
                    borderRadius: '3px',
                    fontSize: '10px',
                    fontWeight: 'bold',
                  }}
                >
                  ONE카드111
                </Box>
                <Typography sx={{ fontSize: '12px', color: '#555' }}>
                  ONE 카드 티켓 10만원 할인쿠폰
                </Typography>
                <ChevronRight sx={{ fontSize: 12 }} />
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{ cursor: 'pointer' }}
              >
                <Box
                  sx={{
                    bgcolor: 'blue',
                    color: 'white',
                    px: 0.6,
                    py: 0.1,
                    borderRadius: '3px',
                    fontSize: '10px',
                    fontWeight: 'bold',
                  }}
                >
                  ONE카드
                </Box>
                <Typography sx={{ fontSize: '12px', color: '#555' }}>
                  ONE 카드 티켓 10만원 할인쿠폰
                </Typography>
                <ChevronRight sx={{ fontSize: 12 }} />
              </Stack>
            </InfoRow>
            <InfoRow label="프로모션">
              <Link href="#">
                카카오머니 결제 시 4천원 즉시할인(선착순)
                <ChevronRight sx={{ fontSize: 12 }} />
              </Link>
            </InfoRow>
            <InfoRow label="배송">
              <Stack spacing={0.5}>
                <Typography variant="body2">1월 19일(월) ~ 21일(수)</Typography>
                <Link href="#">배송주소 확인</Link>
              </Stack>
            </InfoRow>
          </Box>
        </Box>

        {/* 탭메뉴 */}
        <Box>
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab label="공연정보" value="info"></Tab>
            <Tab label="판매정보" value="sale"></Tab>
          </Tabs>
          <Box>
            <TabPanel value="info" current={tab}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                  공연시간 정보
                </Typography>
                <Stack>
                  <Typography variant="body2">2026.02.14(토) 19:00</Typography>
                  <Typography variant="body2">2026.02.15(일) 14:00</Typography>
                  <Typography variant="body2">2026.02.16(월) 14:00</Typography>
                </Stack>
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                  공지사항
                </Typography>
                <Stack spacing={1.5}>
                  <Typography
                    variant="body2"
                    sx={{ color: '#4154ff', fontWeight: 700 }}
                  >
                    ※ 티켓 예매 시 공연 안내사항에 동의한 것으로 간주하며, 본
                    내용은 상황에 따라 추가·변경될 수 있습니다. 공연 관람에
                    지장이나 불이익을 받지 않도록 관람 전 반드시 공연 안내사항을
                    재확인 바랍니다.
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: '#4154ff', fontWeight: 700 }}
                  >
                    ※ 인증 및 예매 전 ONE티켓 회원정보(생년월일, 연락처 등)
                    오기재 된 부분이 없는지 반드시 사전에 확인해 주시기
                    바랍니다. ONE 티켓 예매자와 실 관람자(신분증 지참) 정보가
                    모두 일치해야 하며, 불일치할 경우 입장이 제한됩니다.
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: '#4154ff', fontWeight: 700 }}
                  >
                    ※본 공연은 티켓 불법 양도 및 재판매에 따른 피해를 방지하고자
                    카드 결제만 가능합니다.
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: '#4154ff', fontWeight: 700 }}
                  >
                    ※원활한 예매를 위해 ONE 인터파크 페이, 아이포인트(I-point),
                    ONE 포인트 결제수단이 제한됩니다.
                    <br />
                    (그 외 신용카드, 카카오페이 등 결제수단 사용 가능)
                  </Typography>

                  <Box>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 700, mb: 0.5 }}
                    >
                      [휠체어석 예매 안내]
                    </Typography>
                    <Typography variant="body2">
                      ※ 휠체어석 구매는 ONE 티켓 고객센터(1544-1234)를 통해
                      전화예매만 가능합니다 (*고객센터 운영시간 오전 9시~오후
                      6시)
                    </Typography>
                    <Typography variant="body2">
                      ※ 자세한 사항은 하단 상세이미지 내 &apos;휠체어석 예매
                      안내&apos;를 확인해 주시기 바랍니다.
                    </Typography>
                  </Box>

                  <Typography
                    variant="body2"
                    sx={{ color: '#4154ff', fontWeight: 700 }}
                  >
                    ※ 티켓 분실, 파손 등 어떠한 경우에도 재발권 및 입장이
                    불가능하오니, 티켓보관에 유의해주시기 바랍니다.
                  </Typography>
                </Stack>
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                  공연상세 / 출연진정보
                </Typography>
                <Image
                  src="/images/dummy-poster.jpeg"
                  alt={item.title}
                  width={400}
                  height={500}
                />
              </Box>
            </TabPanel>
            <TabPanel value="sale" current={tab}>
              <Stack spacing={4}>
                {/* 상품관련 정보 */}
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.5 }}>
                    상품관련 정보
                  </Typography>
                  <Box
                    component="table"
                    sx={{
                      width: '100%',
                      borderCollapse: 'collapse',
                      '& th, & td': {
                        border: '1px solid #e0e0e0',
                        p: 1.5,
                        fontSize: '1.4rem',
                        textAlign: 'left',
                        verticalAlign: 'top',
                      },
                      '& th': {
                        bgcolor: '#f9f9f9',
                        fontWeight: 600,
                        color: 'text.secondary',
                        width: '120px',
                        whiteSpace: 'nowrap',
                      },
                    }}
                  >
                    <tbody>
                      <tr>
                        <th>주최/기획</th>
                        <td>주식회사 놀라운</td>
                        <th>고객문의</th>
                        <td>02-1544-1234</td>
                      </tr>
                      <tr>
                        <th>공연시간</th>
                        <td>해당없음</td>
                        <th>관람등급</th>
                        <td>만 9세이상</td>
                      </tr>
                      <tr>
                        <th>주연</th>
                        <td>해당없음</td>
                        <th>공연장소</th>
                        <td>KSPO DOME</td>
                      </tr>
                      <tr>
                        <th>예매수수료</th>
                        <td>장당 2,000원</td>
                        <th>배송료</th>
                        <td>현장수령 무료 (배송불가)</td>
                      </tr>
                      <tr>
                        <th>유효기간/이용조건</th>
                        <td colSpan={3}>
                          2026.02.27~2026.03.01 예매한 공연 날짜, 회차에 한해
                          이용가능
                        </td>
                      </tr>
                      <tr>
                        <th>예매취소조건</th>
                        <td colSpan={3}>
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            취소일자에 따라서 아래와 같이 취소수수료가
                            부과됩니다. 예매 일 기준보다 관람일 기준이 우선
                            적용됩니다. 단, 예매 당일 밤 12시 이전 취소 시에는
                            취소수수료가 없으며, 예매 수수료도
                            환불됩니다.(취소기한 내에 한함)
                          </Typography>
                          <Box
                            component="table"
                            sx={{
                              width: '100%',
                              borderCollapse: 'collapse',
                              '& th, & td': {
                                border: '1px solid #e0e0e0',
                                p: 1,
                                fontSize: '1.4rem',
                              },
                              '& th': {
                                bgcolor: '#f5f5f5',
                                fontWeight: 600,
                              },
                            }}
                          >
                            <thead>
                              <tr>
                                <th>취소일</th>
                                <th>취소수수료</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>예매 후 7일 이내</td>
                                <td>없음</td>
                              </tr>
                              <tr>
                                <td>예매 후 8일~관람일 19일전까지</td>
                                <td>장당 4,000원(티켓금액의 10%한도)</td>
                              </tr>
                              <tr>
                                <td>관람일 18일전~14일전까지</td>
                                <td>티켓금액의 30%</td>
                              </tr>
                              <tr>
                                <td>관람일 13일전~8일전까지</td>
                                <td>티켓금액의 60%</td>
                              </tr>
                              <tr>
                                <td>관람일 7일전~4일전까지</td>
                                <td>티켓금액의 90%</td>
                              </tr>
                              <tr>
                                <td>관람일 3일전</td>
                                <td>티켓금액의 100%</td>
                              </tr>
                            </tbody>
                          </Box>
                        </td>
                      </tr>
                      <tr>
                        <th>취소환불방법</th>
                        <td colSpan={3}>
                          <Stack component="ul" spacing={0.5} sx={{ pl: 2 }}>
                            <li>
                              <Typography variant="body2">
                                My티켓 &gt; 예매/취소내역에서 직접 취소 또는
                                고객센터 (1544-1234)를 통해서 예매를 취소할 수
                                있습니다.
                              </Typography>
                            </li>
                            <li>
                              <Typography variant="body2">
                                티켓이 배송된 이후에는 인터넷 취소가 안되며,
                                취소마감 시간 이전에 티켓이 ONE 티켓 고객센터로
                                반송되어야 취소 가능합니다. 취소수수료는
                                도착일자 기준으로 부과되며, 배송료는 환불되지
                                않습니다.
                              </Typography>
                            </li>
                          </Stack>
                        </td>
                      </tr>
                      <tr>
                        <th>배송티켓 안내</th>
                        <td colSpan={3}>
                          <Stack component="ul" spacing={0.5} sx={{ pl: 2 }}>
                            <li>
                              <Typography variant="body2">
                                티켓 배송 (배송상태 : 배송 준비중 이후) 후에는
                                주소 변경이 불가합니다.
                              </Typography>
                            </li>
                            <li>
                              <Typography variant="body2">
                                부득이하게 주소 변경이 필요하신 경우 각 배송사에
                                수취 거절 요청 후, 고객센터 (1544-1234)로 재배송
                                신청할 수 있습니다.(배송비 3,700원 추가 부과)
                              </Typography>
                            </li>
                            <li>
                              <Typography variant="body2">
                                재배송은 관람일 12일 전까지 결제 완료된 예매분에
                                한해 가능하며, 일부 상품은 제외됩니다.
                              </Typography>
                            </li>
                          </Stack>
                        </td>
                      </tr>
                      <tr>
                        <th>모바일티켓 안내</th>
                        <td colSpan={3}>
                          <Stack component="ul" spacing={0.5} sx={{ pl: 2 }}>
                            <li>
                              <Typography variant="body2">
                                모바일티켓은 모바일 디바이스에서만 이용
                                가능합니다.
                              </Typography>
                            </li>
                            <li>
                              <Typography variant="body2">
                                결제 완료(입금 완료) 후, 예매내역에서 확인할 수
                                있습니다.
                              </Typography>
                            </li>
                            <li>
                              <Typography variant="body2">
                                모바일티켓으로 예매 시, 지류티켓으로 변경할 수
                                없습니다.
                              </Typography>
                            </li>
                            <li>
                              <Typography variant="body2">
                                스포츠 시즌권, ONE 티켓 외 예매처 구매,
                                비회원으로 받은 모바일티켓은 &apos;비회원
                                모바일티켓 조회&apos; 메뉴에서 확인할 수
                                있습니다.
                              </Typography>
                            </li>
                            <li>
                              <Typography variant="body2">
                                안드로이드 버전 7.0이상, iOS 버전 14.0 이상만
                                이용 가능합니다.
                              </Typography>
                            </li>
                            <li>
                              <Typography variant="body2">
                                공연장에서 본인 확인이 어려울 수 있으니, 본인
                                확인이 가능한 신분증(여권, 주민등록증)을 지참해
                                주시기 바랍니다.
                              </Typography>
                            </li>
                            <li>
                              <Typography variant="body2">
                                모바일티켓 관련 자세한 내용은 모바일티켓 FAQ를
                                확인해주세요.
                              </Typography>
                            </li>
                          </Stack>
                        </td>
                      </tr>
                    </tbody>
                  </Box>
                </Box>

                {/* 판매자 정보 */}
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.5 }}>
                    판매자 정보
                  </Typography>
                  <Box
                    component="table"
                    sx={{
                      width: '100%',
                      borderCollapse: 'collapse',
                      '& th, & td': {
                        border: '1px solid #e0e0e0',
                        p: 1.5,
                        fontSize: '1.4rem',
                        textAlign: 'left',
                      },
                      '& th': {
                        bgcolor: '#f9f9f9',
                        fontWeight: 600,
                        color: 'text.secondary',
                        width: '120px',
                        whiteSpace: 'nowrap',
                      },
                    }}
                  >
                    <tbody>
                      <tr>
                        <th>상호</th>
                        <td>주식회사 놀라운</td>
                        <th>대표자명</th>
                        <td>홍길동</td>
                      </tr>
                      <tr>
                        <th>사업자등록번호</th>
                        <td>123-456-7890</td>
                        <th>E-mail</th>
                        <td>help.oneticket@nola.com</td>
                      </tr>
                      <tr>
                        <th>연락처</th>
                        <td colSpan={3}>02-1544-1234</td>
                      </tr>
                      <tr>
                        <th>주소</th>
                        <td colSpan={3}>
                          경기도 성남시 광진구 대남로 70(상곡동)
                        </td>
                      </tr>
                    </tbody>
                  </Box>
                  <Box
                    sx={{
                      mt: 2,
                      p: 2,
                      bgcolor: '#f9f9f9',
                      borderRadius: 1,
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 700, mb: 0.5 }}
                    >
                      ㈜놀라운 안전결제시스템
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{ color: 'text.secondary' }}
                      >
                        {' '}
                        (Escrow System, 에스크로)
                      </Typography>{' '}
                      안내
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary' }}
                    >
                      놀라운의 모든 상품은 판매자 및 결제 수단의 구분 없이
                      회원님들의 구매안전을 위해 안전결제시스템을 도입하여
                      서비스하고 있습니다.
                      <br />
                      결제대금예치업 등록 : 02-000-00000
                    </Typography>
                  </Box>
                </Box>

                {/* 예매 유의사항 */}
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.5 }}>
                    예매 유의사항
                  </Typography>
                  <Stack component="ul" spacing={1} sx={{ pl: 2 }}>
                    <li>
                      <Typography variant="body2">
                        다른 이용자의 원활한 예매 및 취소에 지장을 초래할 정도로
                        반복적인 행위를 지속하는 경우 회원의 서비스 이용을
                        제한할 수 있습니다.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body2">
                        일부 상품의 판매 오픈 시 원활한 서비스 제공을 위하여 ONE
                        인터파크 페이, ONE 포인트, 문화예매권 등의 특정 결제수단
                        이용이 제한될 수 있습니다.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body2">
                        많은 고객이 이용할 수 있도록 결제 가능 시간을 약 7분으로
                        제한합니다. 결제 가능 시간 동안만 선택한 좌석을 선점한
                        것으로, 제한 시간 내에 결제를 마치지 못하면 선택 좌석에
                        대한 예매가 종료됩니다.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body2">
                        결제 가능 시간은 고객의 편의를 위해 노출되는 것으로,
                        사용 환경 등에 따라 실제 시간과 오차가 발생할 수 있으며,
                        천재지변이나 과도한 트래픽 등 예기치 못한 상황에 의하여
                        일시적으로 오류가 발생할 수 있습니다.
                      </Typography>
                    </li>
                  </Stack>
                </Box>

                {/* 환불안내 */}
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.5 }}>
                    환불안내
                  </Typography>

                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 700, mb: 0.5 }}
                  >
                    신용카드 결제의 경우
                  </Typography>
                  <Stack component="ul" spacing={0.5} sx={{ pl: 2, mb: 2 }}>
                    <li>
                      <Typography variant="body2">
                        일반적으로 당사의 취소 처리가 완료되고 4~5일 후 카드사의
                        취소가 확인됩니다. (체크카드 동일)
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body2">
                        예매 취소 시점과 해당 카드사의 환불 처리기준에 따라
                        취소금액의 환급방법과 환급일은 다소 차이가 있을 수
                        있으며, 예매 취소시 기존에 결제하였던 내역을 취소하며
                        최초 결제하셨던 동일카드로 취소 시점에 따라 취소수수료와
                        배송료를 재승인 합니다.
                      </Typography>
                    </li>
                  </Stack>

                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 700, mb: 0.5 }}
                  >
                    무통장 입금의 경우
                  </Typography>
                  <Stack component="ul" spacing={0.5} sx={{ pl: 2, mb: 2 }}>
                    <li>
                      <Typography variant="body2">
                        예매 취소 시에 환불 계좌번호를 남기고, 그 계좌를 통해
                        취소수수료를 제외한 금액을 환불 받습니다. 취소 후
                        고객님의 계좌로 입금까지 대략 5~7일 정도가 소요됩니다.
                        (주말 제외)
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body2">
                        환불은 반드시 예매자 본인 명의의 계좌로만 받으실 수
                        있습니다. 단, 예매자 본인 명의의 계좌가 없을 경우에는
                        직계 가족 명의의 계좌에 한하여 가능하며, 이 경우 관계를
                        증명할 수 있는 증빙서류를 예매자 본인이 팩스나 우편
                        등으로 ONE 티켓 본사로 보내주셔야 합니다. (예매자 본인
                        외 가족이 증빙서류를 보내주셨을 경우, 이로 인해 문제
                        발생 시 환불 접수한 가족 본인에게 모든 책임이 있습니다.)
                      </Typography>
                    </li>
                  </Stack>

                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 700, mb: 0.5 }}
                  >
                    휴대폰 결제의 경우
                  </Typography>
                  <Stack component="ul" spacing={0.5} sx={{ pl: 2, mb: 2 }}>
                    <li>
                      <Typography variant="body2">
                        취소 신청 후 바로 취소 처리가 되며 취소 수수료를 제외한
                        티켓 금액 및 예매수수료/핸드폰결제이용료가 취소
                        가능합니다.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body2">
                        예매 취소 시 기존에 결제하셨던 내역을 취소하며
                        결제하셨던 동일 정보로 취소 시점에 따라 취소수수료가
                        재승인 합니다. (티켓이 배송된 경우는 배송료 포함하여
                        재승인 합니다.)
                      </Typography>
                    </li>
                  </Stack>

                  <Typography
                    variant="body2"
                    sx={{
                      p: 1.5,
                      bgcolor: '#fff8e1',
                      borderRadius: 1,
                      color: 'text.secondary',
                    }}
                  >
                    환불 지연 등에 따른 배상급 지급에 대한 사항은 전자상거래
                    등에서의 소비자 보호에 관한 법률 및 소비자기본법에 따른
                    소비자분쟁 해결기준(공정위 고시)에 따르며 관련 문의는
                    고객센터로 연락주시기 바랍니다.
                  </Typography>
                </Box>

                {/* 무통장입금 시 주의사항 */}
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.5 }}>
                    무통장입금 시 주의사항
                  </Typography>
                  <Stack component="ul" spacing={1} sx={{ pl: 2 }}>
                    <li>
                      <Typography variant="body2">
                        입금 시 총 결제금액을 정확히 입금하여야 합니다.
                        입금금액이 다를 경우 예매내역은 자동취소 되며, 입금된
                        금액은 추후 환불 처리됩니다. 2건 이상 예매시에도, 각
                        예매 건 별로 입금을 하셔야 합니다.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body2">
                        입금 시, 입금자명으로 주문자명과 동일하게 입금해주시기
                        바랍니다.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body2">
                        수표는 정상적으로 입금되지 않고 입금 오류가 발생하오니,
                        현금으로 입금을 해주시기 바랍니다.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body2">
                        예매일 익일 오후 23시 59분까지 입금하지 않으시면
                        자동으로 예매취소 되며, 상품에 따라 입금 기한이 상이 할
                        수 있으니 My 티켓에서 입금 마감시간을 확인해주시기
                        바랍니다. (단, 오후 17시 이후에는 무통장입금 문의 대응이
                        어려울 수 있으니, 이전시간 입금을 권장합니다.)
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body2">
                        주말/공휴일은 은행 영업일이 아니고, ATM기기 중
                        가상계좌입금이 안 되는 경우가 있으니 인터넷뱅킹,
                        폰뱅킹이 어려우신 고객님은 결제방법을 다른 결제수단을
                        선택하시기 바랍니다.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body2">
                        은행에 무통장 입금 시에는 입금증에 반드시 전화번호를
                        기입하시기 바랍니다.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body2">
                        입금 후에는 반드시 입금확인 메일이나 예매확인/취소에서
                        입금확인내역을 확인 후 공연장으로 가시기 바랍니다.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body2">
                        무통장입금 시 입급확인까지 일정시간이 소요될 수
                        있습니다.
                      </Typography>
                    </li>
                  </Stack>
                </Box>
              </Stack>
            </TabPanel>
          </Box>
        </Box>
      </Box>

      {/* 우측 */}
      <Box
        aria-label="예매 패널"
        component="aside"
        sx={{ position: 'sticky', top: '62px', pt: '20px' }}
      >
        <Box>
          <Paper
            elevation={0}
            sx={{ border: '1px solid #ddd', borderRadius: 2, p: 2.5 }}
          >
            <Stack spacing={3}>
              <Box>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mb: 1.5 }}
                >
                  <Typography sx={{ fontSize: '15px', fontWeight: 700 }}>
                    관람일
                  </Typography>
                  <ExpandMore />
                </Stack>

                <Box sx={{ border: '1px solid #eee', borderRadius: 1, p: 2 }}>
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale="ko"
                  >
                    <DateCalendar
                      value={
                        selectedDate ? dayjs(`2026-01-${selectedDate}`) : null
                      }
                      onChange={(newValue) => {
                        const date = newValue.date();
                        if (date === 24 || date === 25) {
                          setSelectedDate(date);
                        }
                      }}
                      slots={{
                        day: CustomDay,
                      }}
                      slotProps={{
                        day: {
                          selectedDate,
                        },
                      }}
                      sx={{
                        width: '100%',
                        '& .MuiPickersCalendarHeader-root': {
                          paddingLeft: 0,
                          paddingRight: 0,
                          marginBottom: 2,
                        },
                        '& .MuiDayCalendar-header': {
                          justifyContent: 'space-between',
                        },
                        '& .MuiDayCalendar-weekContainer': {
                          justifyContent: 'space-between',
                        },
                      }}
                    />
                  </LocalizationProvider>
                </Box>
              </Box>

              {/* 회차 선택 */}
              <Box>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mb: 1.5 }}
                >
                  <Typography sx={{ fontSize: '15px', fontWeight: 700 }}>
                    회차
                  </Typography>
                  <ExpandMore />
                </Stack>
                <Stack direction="row" spacing={1}>
                  {[0, 1].map((s) => (
                    <Button
                      key={s}
                      variant="outlined"
                      fullWidth
                      onClick={() => setSelectedSession(s)}
                      sx={{
                        textTransform: 'none',
                        fontSize: '13px',
                        py: 1,
                        borderColor: selectedSession === s ? '#ff5400' : '#ddd',
                        color: selectedSession === s ? '#ff5400' : '#666',
                        bgcolor: selectedSession === s ? '#fff5f0' : 'white',
                        fontWeight: selectedSession === s ? 700 : 400,
                        '&:hover': {
                          borderColor: '#ff5400',
                          bgcolor: '#fff5f0',
                        },
                      }}
                    >
                      {s + 1}회 {s === 0 ? '18:00' : '20:00'}
                    </Button>
                  ))}
                </Stack>
                <Typography sx={{ fontSize: '11px', color: '#999', mt: 1 }}>
                  잔여석 안내 서비스를 제공하지 않습니다.
                </Typography>
              </Box>

              {/* 버튼 영역 */}
              <Stack spacing={1} sx={{ mt: 1 }}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    bgcolor: '#ff5400',
                    py: 1.5,
                    fontSize: '16px',
                    fontWeight: 700,
                    '&:hover': { bgcolor: '#e64b00' },
                  }}
                >
                  예매하기
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{
                    color: '#ff5400',
                    borderColor: '#ff5400',
                    py: 1.5,
                    fontSize: '16px',
                    fontWeight: 700,
                    '&:hover': { borderColor: '#ff5400', bgcolor: '#fff5f0' },
                  }}
                >
                  BOOKING / 外國語
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default DetailView;
