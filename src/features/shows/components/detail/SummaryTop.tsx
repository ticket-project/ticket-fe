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
      sx={{
        mb: 2.6,
        alignItems: 'start',
        borderBottom: 1,
        borderColor: 'divider',
        pb: 2,
      }}
    >
      <Stack
        direction={{ xs: 'row', lg: 'column' }}
        sx={{
          width: 1,
          alignItems: { xs: 'center', lg: 'flex-start' },
          justifyContent: { xs: 'space-between', lg: 'flex-start' },
        }}
      >
        <Typography
          variant="h2"
          sx={{
            order: { xs: 1, lg: 2 },
            flex: 1,
            minWidth: 0,
            fontSize: { xs: '2.2rem', lg: '2.6rem' },
            fontWeight: 700,
          }}
        >
          {item.title}
        </Typography>
        <Tag
          label={SALE_TYPES[item.saleType].label}
          color="primary"
          size="small"
          sx={{
            order: { xs: 2, lg: 1 },
            flexShrink: 0,
            alignSelf: { xs: 'center', lg: 'flex-start' },
            mb: { xs: 0, lg: 1.5 },
          }}
        />
      </Stack>
    </Stack>
  );
};

export default SummaryTop;
