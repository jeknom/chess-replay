import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { amber } from '@mui/material/colors';

interface BannerProps {
  players: Players;
  currentMove: number;
}

const Banner: FC<BannerProps> = ({ players, currentMove }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      gap: 2,
      borderRadius: 2,
      padding: 2,
    }}
  >
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
      }}
    >
      <Typography variant='h3'>
        {players.white}
        {' '}
        ♘
      </Typography>
      <Typography variant='h4'>vs.</Typography>
      <Typography variant='h3'>
        ♞
        {' '}
        {players.black}
      </Typography>
    </Box>
    <Box
      sx={{
        padding: 1,
        borderRadius: 2,
        backgroundColor: amber[400],
      }}
    >
      <Typography variant='body1'>
        Move
        {' '}
        {currentMove.toString()}
      </Typography>
    </Box>
  </Box>
);

export default Banner;
