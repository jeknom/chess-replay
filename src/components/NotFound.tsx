import { Button, Container, Typography } from '@mui/material';
import React, { FC } from 'react';

interface NotFoundProps {
  onBackToSetup: () => void;
}

const NotFound: FC<NotFoundProps> = ({ onBackToSetup }) => (
  <Container sx={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 2,
  }}
  >
    <Typography>Oops, something went wrong...</Typography>
    <Button variant='outlined' color='primary' onClick={onBackToSetup}>Back to setup</Button>
  </Container>
);

export default NotFound;
