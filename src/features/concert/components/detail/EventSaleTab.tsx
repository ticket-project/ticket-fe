import { Box, Stack, Typography } from '@mui/material';
import { TableBody, TableCell, TableRow, TableHead } from '@mui/material';

import {
  InfoTable,
  InfoTableCell,
  InfoTitle,
  StyledList,
} from '@/features/concert/components/detail/EventDetail.styles';

const EventSaleTab = () => {
  return (
    <Stack spacing={8}>
      <Box>
        <InfoTitle variant="h6">상품관련 정보</InfoTitle>
        <InfoTable>
          <TableBody>
            <TableRow>
              <InfoTableCell component="th">주최/기획</InfoTableCell>
              <TableCell>주식회사 놀라운</TableCell>
              <InfoTableCell component="th">고객문의</InfoTableCell>
              <TableCell>02-1544-1234</TableCell>
            </TableRow>
            <TableRow>
              <InfoTableCell component="th">공연시간</InfoTableCell>
              <TableCell>해당없음</TableCell>
              <InfoTableCell component="th">관람등급</InfoTableCell>
              <TableCell>만 9세이상</TableCell>
            </TableRow>
            <TableRow>
              <InfoTableCell component="th">주연</InfoTableCell>
              <TableCell>해당없음</TableCell>
              <InfoTableCell component="th">공연장소</InfoTableCell>
              <TableCell>KSPO DOME</TableCell>
            </TableRow>
            <TableRow>
              <InfoTableCell component="th">예매수수료</InfoTableCell>
              <TableCell>장당 2,000원</TableCell>
              <InfoTableCell component="th">배송료</InfoTableCell>
              <TableCell>현장수령 무료 (배송불가)</TableCell>
            </TableRow>
            <TableRow>
              <InfoTableCell component="th">유효기간/이용조건</InfoTableCell>
              <TableCell colSpan={3}>
                2026.02.27~2026.03.01 예매한 공연 날짜, 회차에 한해 이용가능
              </TableCell>
            </TableRow>
            <TableRow>
              <InfoTableCell component="th">예매취소조건</InfoTableCell>
              <TableCell colSpan={3}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  취소일자에 따라서 아래와 같이 취소수수료가 부과됩니다. 예매 일
                  기준보다 관람일 기준이 우선 적용됩니다. 단, 예매 당일 밤 12시
                  이전 취소 시에는 취소수수료가 없으며, 예매 수수료도
                  환불됩니다.(취소기한 내에 한함)
                </Typography>
                <InfoTable compact>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        component="th"
                        sx={{ bgcolor: '#f5f5f5', fontWeight: 600 }}
                      >
                        취소일
                      </TableCell>
                      <TableCell
                        component="th"
                        sx={{ bgcolor: '#f5f5f5', fontWeight: 600 }}
                      >
                        취소수수료
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>예매 후 7일 이내</TableCell>
                      <TableCell>없음</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>예매 후 8일~관람일 19일전까지</TableCell>
                      <TableCell>장당 4,000원(티켓금액의 10%한도)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>관람일 18일전~14일전까지</TableCell>
                      <TableCell>티켓금액의 30%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>관람일 13일전~8일전까지</TableCell>
                      <TableCell>티켓금액의 60%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>관람일 7일전~4일전까지</TableCell>
                      <TableCell>티켓금액의 90%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>관람일 3일전</TableCell>
                      <TableCell>티켓금액의 100%</TableCell>
                    </TableRow>
                  </TableBody>
                </InfoTable>
              </TableCell>
            </TableRow>
            <TableRow>
              <InfoTableCell component="th">취소환불방법</InfoTableCell>
              <TableCell colSpan={3}>
                <Stack component="ul" spacing={0.5} sx={{ pl: 2 }}>
                  <li>
                    <Typography variant="body2">
                      My티켓 &gt; 예매/취소내역에서 직접 취소 또는 고객센터
                      (1544-1234)를 통해서 예매를 취소할 수 있습니다.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2">
                      티켓이 배송된 이후에는 인터넷 취소가 안되며, 취소마감 시간
                      이전에 티켓이 ONE 티켓 고객센터로 반송되어야 취소
                      가능합니다. 취소수수료는 도착일자 기준으로 부과되며,
                      배송료는 환불되지 않습니다.
                    </Typography>
                  </li>
                </Stack>
              </TableCell>
            </TableRow>
            <TableRow>
              <InfoTableCell component="th">배송티켓 안내</InfoTableCell>
              <TableCell colSpan={3}>
                <Stack component="ul" spacing={0.5} sx={{ pl: 2 }}>
                  <li>
                    <Typography variant="body2">
                      티켓 배송 (배송상태 : 배송 준비중 이후) 후에는 주소 변경이
                      불가합니다.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2">
                      부득이하게 주소 변경이 필요하신 경우 각 배송사에 수취 거절
                      요청 후, 고객센터 (1544-1234)로 재배송 신청할 수
                      있습니다.(배송비 3,700원 추가 부과)
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2">
                      재배송은 관람일 12일 전까지 결제 완료된 예매분에 한해
                      가능하며, 일부 상품은 제외됩니다.
                    </Typography>
                  </li>
                </Stack>
              </TableCell>
            </TableRow>
            <TableRow>
              <InfoTableCell component="th">모바일티켓 안내</InfoTableCell>
              <TableCell colSpan={3}>
                <Stack component="ul" spacing={0.5} sx={{ pl: 2 }}>
                  <li>
                    <Typography variant="body2">
                      모바일티켓은 모바일 디바이스에서만 이용 가능합니다.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2">
                      결제 완료(입금 완료) 후, 예매내역에서 확인할 수 있습니다.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2">
                      모바일티켓으로 예매 시, 지류티켓으로 변경할 수 없습니다.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2">
                      스포츠 시즌권, ONE 티켓 외 예매처 구매, 비회원으로 받은
                      모바일티켓은 &apos;비회원 모바일티켓 조회&apos; 메뉴에서
                      확인할 수 있습니다.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2">
                      안드로이드 버전 7.0이상, iOS 버전 14.0 이상만 이용
                      가능합니다.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2">
                      공연장에서 본인 확인이 어려울 수 있으니, 본인 확인이
                      가능한 신분증(여권, 주민등록증)을 지참해 주시기 바랍니다.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2">
                      모바일티켓 관련 자세한 내용은 모바일티켓 FAQ를
                      확인해주세요.
                    </Typography>
                  </li>
                </Stack>
              </TableCell>
            </TableRow>
          </TableBody>
        </InfoTable>
      </Box>
      <Box>
        <InfoTitle variant="h6">판매자 정보</InfoTitle>
        <InfoTable>
          <TableBody>
            <TableRow>
              <InfoTableCell component="th">상호</InfoTableCell>
              <TableCell>주식회사 놀라운</TableCell>
              <InfoTableCell component="th">대표자명</InfoTableCell>
              <TableCell>홍길동</TableCell>
            </TableRow>
            <TableRow>
              <InfoTableCell component="th">사업자등록번호</InfoTableCell>
              <TableCell>123-456-7890</TableCell>
              <InfoTableCell component="th">E-mail</InfoTableCell>
              <TableCell>help.oneticket@nola.com</TableCell>
            </TableRow>
            <TableRow>
              <InfoTableCell component="th">연락처</InfoTableCell>
              <TableCell colSpan={3}>02-1544-1234</TableCell>
            </TableRow>
            <TableRow>
              <InfoTableCell component="th">주소</InfoTableCell>
              <TableCell colSpan={3}>
                경기도 성남시 광진구 대남로 70(상곡동)
              </TableCell>
            </TableRow>
          </TableBody>
        </InfoTable>
        <Box
          sx={{
            mt: 2,
            p: 2,
            bgcolor: '#f9f9f9',
            borderRadius: 1,
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.5 }}>
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
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            놀라운의 모든 상품은 판매자 및 결제 수단의 구분 없이 회원님들의
            구매안전을 위해 안전결제시스템을 도입하여 서비스하고 있습니다.
            <br />
            결제대금예치업 등록 : 02-000-00000
          </Typography>
        </Box>
      </Box>
      <Box>
        <InfoTitle variant="h6">예매 유의사항</InfoTitle>
        <StyledList component="ul" spacing={1}>
          <li>
            <Typography variant="body2">
              다른 이용자의 원활한 예매 및 취소에 지장을 초래할 정도로 반복적인
              행위를 지속하는 경우 회원의 서비스 이용을 제한할 수 있습니다.
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              일부 상품의 판매 오픈 시 원활한 서비스 제공을 위하여 ONE 인터파크
              페이, ONE 포인트, 문화예매권 등의 특정 결제수단 이용이 제한될 수
              있습니다.
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              많은 고객이 이용할 수 있도록 결제 가능 시간을 약 7분으로
              제한합니다. 결제 가능 시간 동안만 선택한 좌석을 선점한 것으로,
              제한 시간 내에 결제를 마치지 못하면 선택 좌석에 대한 예매가
              종료됩니다.
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              결제 가능 시간은 고객의 편의를 위해 노출되는 것으로, 사용 환경
              등에 따라 실제 시간과 오차가 발생할 수 있으며, 천재지변이나 과도한
              트래픽 등 예기치 못한 상황에 의하여 일시적으로 오류가 발생할 수
              있습니다.
            </Typography>
          </li>
        </StyledList>
      </Box>
      <Box>
        <InfoTitle variant="h6">환불안내</InfoTitle>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
          신용카드 결제의 경우
        </Typography>
        <StyledList component="ul" spacing={0.5}>
          <li>
            <Typography variant="body2">
              일반적으로 당사의 취소 처리가 완료되고 4~5일 후 카드사의 취소가
              확인됩니다. (체크카드 동일)
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              예매 취소 시점과 해당 카드사의 환불 처리기준에 따라 취소금액의
              환급방법과 환급일은 다소 차이가 있을 수 있으며, 예매 취소시 기존에
              결제하였던 내역을 취소하며 최초 결제하셨던 동일카드로 취소 시점에
              따라 취소수수료와 배송료를 재승인 합니다.
            </Typography>
          </li>
        </StyledList>

        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
          무통장 입금의 경우
        </Typography>
        <StyledList component="ul" spacing={0.5}>
          <li>
            <Typography variant="body2">
              예매 취소 시에 환불 계좌번호를 남기고, 그 계좌를 통해 취소수수료를
              제외한 금액을 환불 받습니다. 취소 후 고객님의 계좌로 입금까지 대략
              5~7일 정도가 소요됩니다. (주말 제외)
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              환불은 반드시 예매자 본인 명의의 계좌로만 받으실 수 있습니다. 단,
              예매자 본인 명의의 계좌가 없을 경우에는 직계 가족 명의의 계좌에
              한하여 가능하며, 이 경우 관계를 증명할 수 있는 증빙서류를 예매자
              본인이 팩스나 우편 등으로 ONE 티켓 본사로 보내주셔야 합니다.
              (예매자 본인 외 가족이 증빙서류를 보내주셨을 경우, 이로 인해 문제
              발생 시 환불 접수한 가족 본인에게 모든 책임이 있습니다.)
            </Typography>
          </li>
        </StyledList>

        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
          휴대폰 결제의 경우
        </Typography>
        <StyledList component="ul" spacing={0.5}>
          <li>
            <Typography variant="body2">
              취소 신청 후 바로 취소 처리가 되며 취소 수수료를 제외한 티켓 금액
              및 예매수수료/핸드폰결제이용료가 취소 가능합니다.
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              예매 취소 시 기존에 결제하셨던 내역을 취소하며 결제하셨던 동일
              정보로 취소 시점에 따라 취소수수료가 재승인 합니다. (티켓이 배송된
              경우는 배송료 포함하여 재승인 합니다.)
            </Typography>
          </li>
        </StyledList>

        <Typography
          variant="body2"
          sx={{
            p: 1.5,
            bgcolor: '#fff8e1',
            borderRadius: 1,
            color: 'text.secondary',
          }}
        >
          환불 지연 등에 따른 배상급 지급에 대한 사항은 전자상거래 등에서의
          소비자 보호에 관한 법률 및 소비자기본법에 따른 소비자분쟁
          해결기준(공정위 고시)에 따르며 관련 문의는 고객센터로 연락주시기
          바랍니다.
        </Typography>
      </Box>
      <Box>
        <InfoTitle variant="h6">무통장입금 시 주의사항</InfoTitle>
        <StyledList component="ul" spacing={1}>
          <li>
            <Typography variant="body2">
              입금 시 총 결제금액을 정확히 입금하여야 합니다. 입금금액이 다를
              경우 예매내역은 자동취소 되며, 입금된 금액은 추후 환불 처리됩니다.
              2건 이상 예매시에도, 각 예매 건 별로 입금을 하셔야 합니다.
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              입금 시, 입금자명으로 주문자명과 동일하게 입금해주시기 바랍니다.
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              수표는 정상적으로 입금되지 않고 입금 오류가 발생하오니, 현금으로
              입금을 해주시기 바랍니다.
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              예매일 익일 오후 23시 59분까지 입금하지 않으시면 자동으로 예매취소
              되며, 상품에 따라 입금 기한이 상이 할 수 있으니 My 티켓에서 입금
              마감시간을 확인해주시기 바랍니다. (단, 오후 17시 이후에는
              무통장입금 문의 대응이 어려울 수 있으니, 이전시간 입금을
              권장합니다.)
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              주말/공휴일은 은행 영업일이 아니고, ATM기기 중 가상계좌입금이 안
              되는 경우가 있으니 인터넷뱅킹, 폰뱅킹이 어려우신 고객님은
              결제방법을 다른 결제수단을 선택하시기 바랍니다.
            </Typography>
          </li>
          <li>
            <Typography variant="body2">
              은행에 무통장 입금 시에는 입금증에 반드시 전화번호를 기입하시기
              바랍니다.
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
              무통장입금 시 입급확인까지 일정시간이 소요될 수 있습니다.
            </Typography>
          </li>
        </StyledList>
      </Box>
    </Stack>
  );
};

export default EventSaleTab;
