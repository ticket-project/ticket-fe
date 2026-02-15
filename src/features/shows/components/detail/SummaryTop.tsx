import { Stack, Typography } from '@mui/material';

import { ShowDetail } from '../../types';

import Tag from '@/components/ui/Tag';
import { SALE_TYPES } from '@/features/shows/constants';

interface SummaryTopProps {
  item: ShowDetail;
}

const SummaryTop = ({ item }: SummaryTopProps) => {
  return (
    <Stack
      spacing={1.5}
      sx={{
        mb: 2.6,
        alignItems: 'start',
        borderBottom: 1,
        borderColor: 'divider',
        pb: 2,
      }}
    >
      <Tag
        label={SALE_TYPES[item.saleType].label}
        color="primary"
        size="small"
      />
      <Typography variant="h2" sx={{ fontSize: '2.6rem', fontWeight: 700 }}>
        {item.title} {item.subTitle}
      </Typography>
    </Stack>
  );
};

export default SummaryTop;
