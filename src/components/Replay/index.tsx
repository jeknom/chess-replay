import React, { FC, useState } from 'react';
import { Box, Button, Slider } from '@mui/material';
import NotFound from '../NotFound';
import Board from './Board';
import Banner from './Banner';

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
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Banner players={gameData.players} currentMove={currentMove} />
      <Box sx={{ width: '95%' }}>
        <Slider
          value={currentMove}
          onChange={handleSliderChange}
          min={0}
          max={gameData.history.length}
        />
      </Box>
      <Board
        currentMove={currentMove}
        dimensions={gameData.size}
        pieces={gameData.board}
        history={gameData.history}
        cellSizeRem={4.75}
      />
      <Button variant='outlined' onClick={onBackToSetup}>Back to setup</Button>
    </Box>
  );
};

Replay.defaultProps = {
  gameData: undefined,
};

export default Replay;
