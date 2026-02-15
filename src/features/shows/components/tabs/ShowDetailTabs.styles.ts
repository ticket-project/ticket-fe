import {
  Stack,
  styled,
  Table,
  TableCell,
  Tabs,
  Typography,
} from '@mui/material';

type InfoTableProps = {
  compact?: boolean;
};

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
