import React, {
  FC, ReactNode, useMemo, useState, useEffect, useCallback,
} from 'react';
import { amber } from '@mui/material/colors';
import { getBoardWithVisuals, getBoardForHistory } from '@utils';
import { Box, Slider, Typography } from '@mui/material';
import Grid from './Grid';
import Cell from './Cell';

export interface ReplayProps {
  gameData?: GameData;
  boardDimensions: number;
  cellSizePx: number;
}

const Replay: FC<ReplayProps> = ({ gameData, boardDimensions, cellSizePx }) => {
  const [initialBoard, setInitialBoard] = useState<PieceWithVisual[]>([]);
  const [currentBoard, setCurrentBoard] = useState<PieceWithVisual[]>([]);
  const [currentMove, setCurrentMove] = useState(0);

  const boardCells: ReactNode[] = useMemo(() => {
    const cells: ReactNode[] = [];
    for (let pos = 0; pos < boardDimensions * boardDimensions; pos += 1) {
      const isCellEven = pos % 2 === 0;
      const isRowEven = Math.floor(pos / boardDimensions) % 2 === 0;
      const useDark = !isRowEven ? isCellEven : !isCellEven;
      const cell = <Cell key={pos} backgroundColor={useDark ? amber[800] : amber[600]} />;

      cells.push(cell);
    }

    return cells;
  }, [boardDimensions, cellSizePx]);

  const handleMoveChange = useCallback((move: number) => {
    if (!gameData) {
      return;
    }

    if (move < 0 || move > initialBoard.length) {
      throw new Error('Move number is out of bounds!');
    }

    const updatedBoard = getBoardForHistory(initialBoard, gameData.history.slice(0, move));
    setCurrentMove(move);
    setCurrentBoard(updatedBoard);
  }, [gameData, gameData?.history, initialBoard]);

  const handleInitializeBoard = () => {
    if (gameData) {
      setInitialBoard(getBoardWithVisuals(gameData?.board));
    }
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    handleMoveChange(newValue as number);
  };

  useEffect(handleInitializeBoard, [gameData]);

  if (!gameData) {
    return <Typography>Missing game data!</Typography>;
  }

  // Will add visualization for this later.
  // eslint-disable-next-line no-console
  console.log(currentBoard);

  return (
    <>
      <Box sx={{ maxWidth: 300, minWidth: 250 }}>
        <Slider
          value={currentMove}
          onChange={handleSliderChange}
          valueLabelDisplay='auto'
          min={0}
          max={gameData.history.length}
        />
      </Box>
      <Grid dimensions={boardDimensions} cellSizePx={cellSizePx}>
        {boardCells}
      </Grid>
    </>
  );
};

Replay.defaultProps = {
  gameData: undefined,
};

export default Replay;
