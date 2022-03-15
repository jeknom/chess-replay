import React, { FC, useState } from 'react';
import {
  Menu, IconButton, MenuItem, ListItemIcon, ListItemText, Typography,
} from '@mui/material';
import { List } from '@mui/icons-material';
import MoveItem from './MoveItem';

interface MoveSelectProps {
  currentMove: number;
  moves: Move[];
  onMoveSelected: (move: number) => void;
}

const MoveMenu: FC<MoveSelectProps> = ({
  currentMove, moves, onMoveSelected,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const items = [...moves].map((m, i) => (
    <MoveItem
      key={`${m.pieceId}-${m.toPos.x}${m.toPos.y}`}
      moveNumber={i + 1}
      move={m}
      isSelected={currentMove === i + 1}
      onSelect={onMoveSelected}
    />
  ));

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton color='primary' onClick={handleOpenMenu}>
        <List />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={anchorEl !== null}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={() => onMoveSelected(0)} selected={currentMove === 0}>
          <ListItemIcon>
            <Typography variant='h6'>S</Typography>
          </ListItemIcon>
          <ListItemText primary='Game start' />
        </MenuItem>
        {items}
      </Menu>
    </>
  );
};

export default MoveMenu;
