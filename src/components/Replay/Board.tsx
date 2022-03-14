// We don't want to destructure MUI colors
/* eslint-disable prefer-destructuring */
import React, { FC, ReactNode } from 'react';
import { Typography } from '@mui/material';
import {
  getBoardWithVisuals,
  getBoardForHistory,
  getPositionForIndex,
  getBoardAsIfGameStarted,
  getLatestMoveFromHistory,
} from '@utils';
import BoardGrid from './Grid';
import BoardCell from './Cell';

interface BoardProps {
  currentMove: number;
  dimensions: number;
  pieces: Piece[];
  history: Move[];
  cellSizeRem: number;
}

const Board: FC<BoardProps> = ({
  currentMove,
  dimensions,
  pieces,
  history,
  cellSizeRem,
}) => {
  const boardAtGameStart = getBoardAsIfGameStarted(pieces, history);
  const boardWithVisuals = getBoardWithVisuals(boardAtGameStart);
  const currentBoard = getBoardForHistory(boardWithVisuals, history, currentMove);
  const latestMove = getLatestMoveFromHistory(history, currentMove);
  const boardCells: ReactNode[] = [];

  for (let pos = 0; pos < dimensions * dimensions; pos += 1) {
    const boardPosition = getPositionForIndex(pos, dimensions);
    const isFromCell = boardPosition.x === latestMove?.fromPos.x
      && boardPosition.y === latestMove?.fromPos.y;
    const isToCell = boardPosition.x === latestMove?.toPos.x
      && boardPosition.y === latestMove?.toPos.y;
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
        isFromCell={isFromCell}
        isToCell={isToCell}
        useDark={useDark}
      >
        {visual}
      </BoardCell>,
    );
  }

  return (
    <BoardGrid dimensions={dimensions} cellSizeRem={cellSizeRem}>
      {boardCells}
    </BoardGrid>
  );
};

export default Board;
