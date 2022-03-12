import React, { FC, ReactNode } from 'react';
import { amber } from '@mui/material/colors';
import Grid from './Grid';
import Cell from './Cell';

export interface ReplayProps {
  gameData?: GameData;
  boardDimensions: number;
  cellSizePx: number;
}

// Will use the data here later
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Replay: FC<ReplayProps> = ({ gameData, boardDimensions, cellSizePx }) => {
  const cells: ReactNode[] = [];
  for (let pos = 0; pos < boardDimensions * boardDimensions; pos += 1) {
    const isCellEven = pos % 2 === 0;
    const isRowEven = Math.floor(pos / boardDimensions) % 2 === 0;
    const useDark = !isRowEven ? isCellEven : !isCellEven;
    const cell = <Cell key={pos} backgroundColor={useDark ? amber[800] : amber[600]} />;

    cells.push(cell);
  }

  return (
    <Grid dimensions={boardDimensions} cellSizePx={cellSizePx}>
      {cells}
    </Grid>
  );
};

Replay.defaultProps = {
  gameData: undefined,
};

export default Replay;
