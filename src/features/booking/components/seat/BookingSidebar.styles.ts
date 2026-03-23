import { Clear } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
  styled,
} from '@mui/material';

export const DesktopSidebar = styled(Box)(({ theme }) => ({
  display: 'none',
  flexDirection: 'column',
  height: '100%',
  minHeight: 0,
  [theme.breakpoints.up('lg')]: {
    display: 'flex',
  },
}));

export const SidebarHeader = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '2.3rem 2rem',
}));

export const SidebarTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.8rem',
  fontWeight: 800,
  lineHeight: 1,
  [theme.breakpoints.up('md')]: {
    fontSize: '2rem',
  },
}));

export const SidebarCount = styled(Typography)(({ theme }) => ({
  marginLeft: '.8rem',
  fontSize: 'inherit',
  fontWeight: 'inherit',
  color: theme.palette.primary.main,
  verticalAlign: 'baseline',
}));

export const SidebarTextButton = styled(Button)(({ theme }) => ({
  fontSize: '1.8rem',
  lineHeight: 1,
  color: theme.palette.grey[500],
}));

export const SidebarContent = styled(Box)(() => ({
  flex: 1,
  minHeight: 0,
  overflowY: 'auto',
  padding: '0 2rem',
}));

export const SidebarEmpty = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
}));

export const SidebarEmptyText = styled(Typography)(({ theme }) => ({
  fontSize: '2rem',
  fontWeight: 500,
  color: theme.palette.grey[400],
}));

export const SeatItem = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  borderTop: '1px solid #e0e0e0',
}));

export const SeatItemContent = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  flex: 1,
  paddingBottom: '1.6rem',
  paddingTop: '1.6rem',
  [theme.breakpoints.up('lg')]: {
    paddingBottom: '2.3rem',
    paddingTop: '2.3rem',
  },
}));

export const SeatGradeText = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 800,
  [theme.breakpoints.up('lg')]: {
    fontSize: '1.7rem',
  },
}));

export const SeatMeta = styled(Box)(() => ({
  marginTop: '.1rem',
  color: 'grey.600',
}));

export const SeatMetaText = styled(Typography)(({ theme }) => ({
  fontSize: '1.4rem',
  [theme.breakpoints.up('lg')]: {
    fontSize: '1.6rem',
  },
}));

export const SeatPriceText = styled(Typography)(({ theme }) => ({
  fontSize: '1.6rem',
  fontWeight: 800,
  [theme.breakpoints.up('lg')]: {
    fontSize: '2rem',
  },
}));

export const SeatDeleteButton = styled(IconButton)(() => ({
  paddingLeft: '16px',
  paddingRight: 0,
  '&:hover': {
    backgroundColor: 'transparent',
  },
}));

export const DeleteIcon = styled(Clear)(({ theme }) => ({
  fontSize: '1.8rem',
  color: 'grey.400',
  [theme.breakpoints.up('lg')]: {
    fontSize: '2rem',
  },
}));

export const SidebarFooter = styled(Box)(() => ({
  padding: '3.2rem 2rem',
}));

export const SidebarFooterRow = styled(Stack)(() => ({
  alignItems: 'center',
}));

export const SidebarPriceBox = styled(Box)(() => ({
  flexShrink: 0,
}));

export const SidebarPriceLabel = styled(Typography)(({ theme }) => ({
  fontSize: '1.6rem',
  color: theme.palette.grey[600],
}));

export const SidebarPriceValue = styled(Typography)(() => ({
  marginTop: '.2rem',
  fontSize: '2rem',
  fontWeight: 800,
  lineHeight: 1,
}));

export const SidebarPrimaryButton = styled(Button)(() => ({
  position: 'relative',
  paddingBottom: '1.2rem',
  paddingTop: '1.2rem',
  fontSize: '2rem',
  fontWeight: 800,
  color: 'white',
  borderRadius: '1rem',
}));

export const SidebarButtonSpinner = styled(CircularProgress)(() => ({
  color: 'currentColor',
}));

export const SidebarButtonLabel = styled('span')({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const SidebarButtonSpinnerBox = styled('span')(() => ({
  position: 'absolute',
  inset: 0,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const MobileSidebarRoot = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 40,
  display: 'block',

  [theme.breakpoints.up('lg')]: {
    display: 'none',
  },
}));

export const MobileSidebarSheet = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  maxHeight: '35rem',
  overflow: 'hidden',
  backgroundColor: 'white',
  boxShadow: '0 -0.6rem 2.4rem rgba(15, 23, 42, 0.16)',
  borderTopLeftRadius: '2.8rem',
  borderTopRightRadius: '2.8rem',
}));

export const MobileToggleArea = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  paddingTop: '0.6rem',
}));

export const MobileToggleButton = styled(IconButton)(({ theme }) => ({
  padding: 0,
  color: theme.palette.grey[300],
  '&:hover': {
    backgroundColor: 'transparent',
  },
}));

export const MobileHeader = styled(Box, {
  shouldForwardProp: (prop) => prop !== '$expanded',
})<{ $expanded: boolean }>(({ $expanded }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: `0.6rem 2rem ${$expanded ? '1.6rem' : '1.2rem'}`,
}));

export const MobileTextButton = styled(Button)(({ theme }) => ({
  minWidth: 0,
  padding: 0,
  fontSize: '1.5rem',
  fontWeight: 500,
  color: theme.palette.grey[500],
}));

export const MobileSeatList = styled(Box)(() => ({
  overflowY: 'auto',
  padding: '0 2rem 1.6rem',
}));

export const MobileFooter = styled(Box, {
  shouldForwardProp: (prop) => prop !== '$expanded',
})<{ $expanded: boolean }>(({ $expanded }) => ({
  padding: ` ${$expanded ? '0' : '.8rem'} 2rem calc(env(safe-area-inset-bottom, 0px) + 1.6rem)`,
}));

export const MobilePrimaryButton = styled(Button)(() => ({
  position: 'relative',
  paddingBottom: '0.8rem',
  paddingTop: '0.8rem',
  fontSize: '1.8rem',
  fontWeight: 800,
  color: 'white',
  borderRadius: '1rem',
}));
