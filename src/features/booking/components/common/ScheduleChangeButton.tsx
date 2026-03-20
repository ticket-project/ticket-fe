import { Button } from '@mui/material';

interface ScheduleChangeButtonProps {
  onClick?: () => void;
}

const ScheduleChangeButton = ({ onClick }: ScheduleChangeButtonProps) => (
  <Button
    onClick={onClick}
    variant="outlined"
    sx={{
      fontSize: '1.6rem',
      fontWeight: 800,
      whiteSpace: 'nowrap',
      flexShrink: 0,
    }}
  >
    일정변경
  </Button>
);

export default ScheduleChangeButton;
