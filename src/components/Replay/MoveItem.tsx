import React, { FC } from 'react';
import {
  Typography, MenuItem, ListItemIcon, ListItemText,
} from '@mui/material';
import { mapPieceIdToVisual } from '@utils';

export interface MoveItemProps {
  moveNumber: number;
  move: Move;
  isSelected: boolean;
  onSelect: (move: number) => void;
}

const MoveItem: FC<MoveItemProps> = ({
  moveNumber, move, isSelected, onSelect,
}) => (
  <MenuItem
    onClick={() => onSelect(moveNumber)}
    selected={isSelected}
    autoFocus={isSelected}
    dense
  >
    <ListItemIcon>
      <Typography variant='h6'>{mapPieceIdToVisual(move.pieceId, move.pieceId)}</Typography>
    </ListItemIcon>
    <ListItemText
      primary={`Move ${moveNumber.toString()}`}
      secondary={`${move.fromPos.x}X ${move.fromPos.y}Y -> ${move.toPos.x}X ${move.toPos.y}Y`}
    />
  </MenuItem>
);

export default MoveItem;
