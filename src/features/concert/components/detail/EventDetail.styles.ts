import {
  Box,
  IconButton,
  Stack,
  Table,
  styled,
  TableCell,
  Tabs,
  Typography,
} from '@mui/material';

type InfoTableProps = {
  compact?: boolean;
};

export const Root = styled(Box)(({ theme }) => ({
  display: 'grid',
  alignItems: 'start',
  gap: theme.spacing(10),

  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'minmax(0, 1fr) 340px',
  },
}));

export const SummaryBody = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(6),
  gridTemplateColumns: '300px minmax(0,1fr)',
  // [theme.breakpoints.up('sm')]: {},
  // [theme.breakpoints.up('md')]: {},
}));

export const PosterArea = styled(Box)(({ theme }) => ({
  position: 'relative',
  aspectRatio: '1/1.32',
}));

export const ActionArea = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: theme.spacing(1.2),
}));

export const ShareButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
  '&:hover': { backgroundColor: theme.palette.grey[300] },
}));

export const BenefitBadge = styled(Box)({
  padding: '0.8px 3.2px',
  fontSize: 11,
  fontWeight: 800,
  whiteSpace: 'nowrap',
  color: 'white',
  borderRadius: '3px',
});

export const StyledTabs = styled(Tabs)(({ theme }) => ({
  borderBottom: '1px solid',
  borderColor: theme.palette.divider,
  '& .MuiTab-root': {
    minWidth: 'auto',
    marginRight: theme.spacing(4),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    fontSize: '15px',
    fontWeight: 'bold',
    color: '#999',
    '&.Mui-selected': { color: '#111' },
  },
  '& .MuiTabs-indicator': {
    height: 4,
    backgroundColor: theme.palette.grey[900],
  },
}));

export const InfoTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2.2),
  fontSize: 20,
  fontWeight: 800,
}));

export const InfoTable = styled(Table, {
  shouldForwardProp: (prop) => prop !== 'compact',
})<InfoTableProps>(({ compact, theme }) => ({
  '& .MuiTableCell-root': {
    padding: theme.spacing(compact ? 1 : 1.5),
    fontSize: '1.4rem',
    textAlign: 'left',
    border: '1px solid #e0e0e0',
    verticalAlign: 'top',
  },
}));

export const InfoTableCell = styled(TableCell)(({ theme }) => ({
  width: '120px',
  fontWeight: 600,
  whiteSpace: 'nowrap',
  color: theme.palette.text.secondary,
  backgroundColor: '#f9f9f9',
}));

export const StyledList = styled(Stack)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  paddingLeft: theme.spacing(2),
  '& li': {
    lineHeight: 1,
    listStyleType: 'disc',
  },
}));
