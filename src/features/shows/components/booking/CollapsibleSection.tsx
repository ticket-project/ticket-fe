import { ExpandMore } from '@mui/icons-material';
import { Box, Collapse, IconButton, Stack, Typography } from '@mui/material';

interface CollapsibleSectionProps {
  title: string;
  expanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  summary?: React.ReactNode;
}

const CollapsibleSection = ({
  title,
  expanded,
  onToggle,
  children,
  summary,
}: CollapsibleSectionProps) => {
  return (
    <Box>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 1.5 }}
      >
        <Typography sx={{ fontSize: '1.5rem', fontWeight: 700 }}>
          {title}
        </Typography>
        <IconButton
          size="small"
          aria-label={`${title} 펼치기`}
          aria-expanded={expanded}
          onClick={onToggle}
        >
          <ExpandMore
            sx={{
              transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease',
            }}
          />
        </IconButton>
      </Stack>
      {!expanded && summary}
      <Collapse in={expanded}>{children}</Collapse>
    </Box>
  );
};

export default CollapsibleSection;
