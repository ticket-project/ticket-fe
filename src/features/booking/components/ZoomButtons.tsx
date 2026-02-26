import Add from '@mui/icons-material/Add';
import FitScreen from '@mui/icons-material/FitScreen';
import Remove from '@mui/icons-material/Remove';
import { useControls } from 'react-zoom-pan-pinch';

import { StyledIconButton, ZoomControls } from './seatmap/Seat.styles';

const ZoomButtons = () => {
  const { zoomIn, zoomOut, resetTransform } = useControls();

  return (
    <ZoomControls>
      <StyledIconButton aria-label="확대" onClick={() => zoomIn()}>
        <Add />
      </StyledIconButton>
      <StyledIconButton aria-label="축소" onClick={() => zoomOut()}>
        <Remove />
      </StyledIconButton>
      <StyledIconButton
        aria-label="화면에 맞춤"
        onClick={() => resetTransform()}
      >
        <FitScreen />
      </StyledIconButton>
    </ZoomControls>
  );
};

export default ZoomButtons;
