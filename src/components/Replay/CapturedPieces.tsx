import { Box, Typography } from '@mui/material';
import { mapPieceIdToVisual } from '@utils';
import React, { FC } from 'react';

interface CapturedPiecesProps {
  pieces: Piece[];
}

const CapturedPieces: FC<CapturedPiecesProps> = ({ pieces }) => {
  const pieceElements = pieces.map((p) => (
    <Typography key={p.id} variant='h4'>{mapPieceIdToVisual(p.id, p.type)}</Typography>
  ));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '3rem',
      }}
    >
      {pieceElements}
    </Box>
  );
};

export default CapturedPieces;
