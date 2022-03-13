import React, { FC, useState } from 'react';
import { Box, Slider } from '@mui/material';
import NotFound from '../NotFound';
import Board from './Board';

export interface ReplayProps {
  gameData?: GameData;
  onBackToSetup: () => void;
}

const Replay: FC<ReplayProps> = ({ gameData, onBackToSetup }) => {
  const [currentMove, setCurrentMove] = useState(0);

  if (!gameData) {
    return <NotFound onBackToSetup={onBackToSetup} />;
  }

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setCurrentMove(newValue as number);
  };

  return (
    <>
      <Box sx={{ maxWidth: 500, minWidth: 400 }}>
        <Slider
          value={currentMove}
          onChange={handleSliderChange}
          valueLabelDisplay='auto'
          min={0}
          max={gameData.history.length}
        />
      </Box>
      <Board
        currentMove={currentMove}
        dimensions={gameData.size}
        pieces={gameData.board}
        history={gameData.history}
        cellSizePx={70}
      />
    </>
  );
};

Replay.defaultProps = {
  gameData: undefined,
};

export default Replay;
