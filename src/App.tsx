import React, { FC } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import {
  Container, GlobalStyles, Paper, Typography,
} from '@mui/material';
import { theme, globalStyle } from './constants';

const App: FC = () => (
  <>
    <CssBaseline />
    <GlobalStyles styles={globalStyle} />
    <ThemeProvider theme={theme}>
      <Container sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      >
        <Paper
          sx={{
            maxWidth: 300,
            maxHeight: 300,
            padding: 2,
          }}
        >
          <Typography variant='h5'>Chess replay</Typography>
        </Paper>
      </Container>
    </ThemeProvider>
  </>
);

export default App;
