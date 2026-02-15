import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';

import { INSTALLMENT_DATA } from '../../constants';

const InstallmentTooltipContent = () => {
  return (
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
              <TableCell sx={{ whiteSpace: 'nowrap' }}>{row.plan}</TableCell>
              <TableCell sx={{ width: 150 }}>{row.condition}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default InstallmentTooltipContent;
