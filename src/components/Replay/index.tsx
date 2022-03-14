import React, { FC, useState } from 'react';
import { Box, Button, Slider } from '@mui/material';
import { getCapturedPiecesForHistory } from '@utils';
import NotFound from '../NotFound';
import Board from './Board';
import Banner from './Banner';
import MoveMenu from './MoveMenu';
import CapturedPieces from './CapturedPieces';

export interface ReplayProps {
  gameData?: GameData;
  onBackToSetup: () => void;
}

const Replay: FC<ReplayProps> = ({ gameData, onBackToSetup }) => {
  const [currentMove, setCurrentMove] = useState(0);

  if (!gameData) {
    return <NotFound onBackToSetup={onBackToSetup} />;
  }

  const capturedPieces = getCapturedPiecesForHistory(gameData.history || [], currentMove);

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
        marginTop: '7.5%',
        marginBottom: 2,
      }}
    >
      <Banner players={gameData.players} currentMove={currentMove} />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '37.5rem',
          gap: 2,
        }}
      >
        <Slider
          value={currentMove}
          onChange={handleSliderChange}
          min={0}
          max={gameData.history.length}
        />
        <MoveMenu
          currentMove={currentMove}
          moves={[...gameData.history].reverse()}
          onMoveSelected={setCurrentMove}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: 4,
        }}
      >
        <CapturedPieces
          pieces={capturedPieces.filter((p) => p.team === 'black')}
        />
        <Board
          currentMove={currentMove}
          dimensions={gameData.size}
          pieces={gameData.board}
          history={gameData.history}
          cellSizeRem={4.75}
        />
        <CapturedPieces
          pieces={capturedPieces.filter((p) => p.team === 'white')}
        />
      </Box>
      <Button variant='outlined' onClick={onBackToSetup}>Back to setup</Button>
    </Box>
  );
};

Replay.defaultProps = {
  gameData: undefined,
};

export default Replay;
