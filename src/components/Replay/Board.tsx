import React, { FC, ReactNode } from 'react';
import { Typography } from '@mui/material';
import { amber } from '@mui/material/colors';
import {
  getBoardWithVisuals,
  getBoardForHistory,
  getPositionForIndex,
  getBoardAsIfGameStarted,
} from '@utils';
import BoardGrid from './Grid';
import BoardCell from './Cell';

interface BoardProps {
  currentMove: number;
  dimensions: number;
  pieces: Piece[];
  history: Move[];
  cellSizePx: number;
}

const Board: FC<BoardProps> = ({
  currentMove,
  dimensions,
  pieces,
  history,
  cellSizePx,
}) => {
  const boardAtGameStart = getBoardAsIfGameStarted(pieces, history);
  const boardWithVisuals = getBoardWithVisuals(boardAtGameStart);
  const currentBoard = getBoardForHistory(boardWithVisuals, history, currentMove);
  const boardCells: ReactNode[] = [];

  for (let pos = 0; pos < dimensions * dimensions; pos += 1) {
    const boardPosition = getPositionForIndex(pos, dimensions);
    const isCellEven = pos % 2 === 0;
    const isRowEven = Math.floor(pos / dimensions) % 2 === 0;
    const useDark = !isRowEven ? isCellEven : !isCellEven;
    let visual: ReactNode | null;

    for (let p = 0; p < currentBoard.length; p += 1) {
      const piece = currentBoard[p];
      const { x, y } = piece.pos;
      if (x === boardPosition.x && y === boardPosition.y) {
        visual = <Typography variant='h3'>{piece.visual}</Typography>;
      }
    }

    boardCells.push(
      <BoardCell
        key={pos}
        backgroundColor={useDark ? amber[800] : amber[600]}
      >
        {visual}
      </BoardCell>,
    );
  }

  return (
    <BoardGrid dimensions={dimensions} cellSizePx={cellSizePx}>
      {boardCells}
    </BoardGrid>
  );
};

export default Board;
