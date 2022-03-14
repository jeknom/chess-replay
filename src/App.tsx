import React, { FC, useState, useMemo } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import {
  Container,
} from '@mui/material';
import { Setup, Replay, NotFound } from '@components';
import { theme, viewState } from '@constants';

const App: FC = () => {
  const [view, setView] = useState<ViewState>(viewState.SETUP);
  const [gameData, setGameData] = useState<GameData>();

  const handleSetGameData = (data: GameData) => {
    setGameData(data);
    setView(viewState.REPLAY);
  };

  const handleRedirectBackToSetup = () => {
    setGameData(undefined);
    setView(viewState.SETUP);
  };

  const currentView = useMemo(() => {
    switch (view) {
      case viewState.SETUP:
        return <Setup onSetGameData={handleSetGameData} />;
      case viewState.REPLAY:
        return (
          <Replay
            gameData={gameData}
            onBackToSetup={handleRedirectBackToSetup}
          />
        );
      default:
        return <NotFound onBackToSetup={handleRedirectBackToSetup} />;
    }
  }, [view]);

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Container sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 2,
        }}
        >
          {currentView}
        </Container>
      </ThemeProvider>
    </>
  );
};

export default App;
