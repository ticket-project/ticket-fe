'use client';

import { SeatViewItem } from '../../types';

import { formatKRW } from '../../utils';
import BookingSidebarMobile from './BookingSidebarMobile';

import {
  DeleteIcon,
  SidebarButtonLabel,
  SidebarButtonSpinner,
  SidebarButtonSpinnerBox,
  DesktopSidebar,
  SeatDeleteButton,
  SeatGradeText,
  SeatItem,
  SeatItemContent,
  SeatMeta,
  SeatMetaText,
  SeatPriceText,
  SidebarContent,
  SidebarCount,
  SidebarEmpty,
  SidebarEmptyText,
  SidebarFooter,
  SidebarFooterRow,
  SidebarHeader,
  SidebarPriceBox,
  SidebarPriceLabel,
  SidebarPriceValue,
  SidebarPrimaryButton,
  SidebarTextButton,
  SidebarTitle,
} from './BookingSidebar.styles';

interface BookingSidebarProps {
  selectedSeats: SeatViewItem[];
  pendingSeatIds: Set<number>;
  isHolding: boolean;
  onClearSeats: () => Promise<void>;
  onDeselectSeat: (seatId: number) => Promise<void>;
  onHoldSeats: () => Promise<void>;
}

const BookingSidebar = ({
  selectedSeats,
  pendingSeatIds,
  isHolding,
  onClearSeats,
  onDeselectSeat,
  onHoldSeats,
}: BookingSidebarProps) => {
  const selectedCount = selectedSeats.length;
  const isEmpty = selectedCount === 0;
  const totalPrice = selectedSeats.reduce(
    (acc, seat) => acc + seat.grade.price,
    0
  );

  return (
    <>
      <DesktopSidebar>
        <SidebarHeader>
          <SidebarTitle>
            선택 좌석
            <SidebarCount as="span">{!isEmpty && selectedCount}</SidebarCount>
          </SidebarTitle>
          {!isEmpty && (
            <SidebarTextButton variant="text" onClick={onClearSeats}>
              전체삭제
            </SidebarTextButton>
          )}
        </SidebarHeader>
        <SidebarContent>
          {isEmpty ? (
            <SidebarEmpty>
              <SidebarEmptyText>선택한 좌석이 없습니다.</SidebarEmptyText>
            </SidebarEmpty>
          ) : (
            selectedSeats.map((seat) => (
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
                  onClick={() => onDeselectSeat(seat.id)}
                >
                  <DeleteIcon />
                </SeatDeleteButton>
              </SeatItem>
            ))
          )}
        </SidebarContent>
        <SidebarFooter>
          <SidebarFooterRow direction="row" spacing="2rem">
            <SidebarPriceBox>
              <SidebarPriceLabel>티켓 총 금액</SidebarPriceLabel>
              <SidebarPriceValue>{formatKRW(totalPrice)}</SidebarPriceValue>
            </SidebarPriceBox>
            <SidebarPrimaryButton
              fullWidth
              variant="contained"
              disabled={isEmpty || isHolding}
              aria-busy={isHolding}
              onClick={onHoldSeats}
            >
              <SidebarButtonLabel
                sx={{ visibility: isHolding ? 'hidden' : 'visible' }}
              >
                예매하기
              </SidebarButtonLabel>
              {isHolding && (
                <SidebarButtonSpinnerBox>
                  <SidebarButtonSpinner size={20} />
                </SidebarButtonSpinnerBox>
              )}
            </SidebarPrimaryButton>
          </SidebarFooterRow>
        </SidebarFooter>
      </DesktopSidebar>

      {!isEmpty && (
        <BookingSidebarMobile
          selectedSeats={selectedSeats}
          pendingSeatIds={pendingSeatIds}
          isHolding={isHolding}
          onClearSeats={onClearSeats}
          onDeselectSeat={onDeselectSeat}
          onHoldSeats={onHoldSeats}
        />
      )}
    </>
  );
};

export default BookingSidebar;
