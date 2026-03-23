import { useState } from 'react';

import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

import { SeatViewItem } from '../../types';

import { formatKRW } from '../../utils';

import {
  DeleteIcon,
  MobileFooter,
  MobileHeader,
  MobilePrimaryButton,
  MobileSeatList,
  MobileSidebarRoot,
  MobileSidebarSheet,
  MobileTextButton,
  MobileToggleArea,
  MobileToggleButton,
  SeatDeleteButton,
  SeatGradeText,
  SeatItem,
  SeatItemContent,
  SeatMeta,
  SeatMetaText,
  SeatPriceText,
  SidebarCount,
  SidebarFooterRow,
  SidebarPriceBox,
  SidebarPriceLabel,
  SidebarPriceValue,
  SidebarPrimaryButton,
  SidebarTitle,
} from './BookingSidebar.styles';

interface BookingSidebarMobileProps {
  selectedSeats: SeatViewItem[];
  pendingSeatIds: Set<number>;
  onClearSeats: () => Promise<void>;
  onDeselectSeat: (seatId: number) => Promise<void>;
  onHoldSeats: () => Promise<void>;
  totalPrice: number;
}

const BookingSidebarMobile = ({
  selectedSeats,
  pendingSeatIds,
  onClearSeats,
  onDeselectSeat,
  onHoldSeats,
  totalPrice,
}: BookingSidebarMobileProps) => {
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);
  const selectedCount = selectedSeats.length;

  const handleClear = async () => {
    setIsMobileExpanded(false);
    await onClearSeats();
  };

  const handleDeselect = async (seatId: number) => {
    if (selectedCount === 1) {
      setIsMobileExpanded(false);
    }

    await onDeselectSeat(seatId);
  };

  return (
    <MobileSidebarRoot>
      <MobileSidebarSheet>
        <MobileToggleArea>
          <MobileToggleButton
            aria-label={
              isMobileExpanded ? '좌석 패널 접기' : '좌석 패널 펼치기'
            }
            onClick={() => setIsMobileExpanded((prev) => !prev)}
          >
            {isMobileExpanded ? (
              <KeyboardArrowDown sx={{ fontSize: '2.8rem' }} />
            ) : (
              <KeyboardArrowUp sx={{ fontSize: '2.8rem' }} />
            )}
          </MobileToggleButton>
        </MobileToggleArea>
        <MobileHeader $expanded={isMobileExpanded}>
          <SidebarTitle>
            선택 좌석
            <SidebarCount as="span">{selectedCount}</SidebarCount>
          </SidebarTitle>
          <MobileTextButton variant="text" onClick={handleClear}>
            전체삭제
          </MobileTextButton>
        </MobileHeader>
        {isMobileExpanded && (
          <MobileSeatList>
            {selectedSeats.map((seat, index) => (
              <SeatItem key={seat.id}>
                <SeatItemContent
                  direction="row"
                  justifyContent="space-between"
                  spacing="1.2rem"
                >
                  <div>
                    <SeatGradeText>{seat.grade.name}</SeatGradeText>
                    <SeatMeta>
                      <SeatMetaText>
                        {seat.floor}층 {seat.section}구역 {seat.row}열{' '}
                        {seat.col}번
                      </SeatMetaText>
                    </SeatMeta>
                  </div>
                  <SeatPriceText>{formatKRW(seat.grade.price)}</SeatPriceText>
                </SeatItemContent>
                <SeatDeleteButton
                  aria-label={`${seat.row}열 ${seat.col}번 삭제`}
                  disabled={pendingSeatIds.has(seat.id)}
                  onClick={() => handleDeselect(seat.id)}
                >
                  <DeleteIcon />
                </SeatDeleteButton>
              </SeatItem>
            ))}
          </MobileSeatList>
        )}
        <MobileFooter $expanded={isMobileExpanded}>
          <MobilePrimaryButton
            fullWidth
            variant="contained"
            onClick={onHoldSeats}
          >
            예매하기
          </MobilePrimaryButton>
        </MobileFooter>
      </MobileSidebarSheet>
    </MobileSidebarRoot>
  );
};

export default BookingSidebarMobile;
