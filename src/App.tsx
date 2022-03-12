import React, { FC, useState, useMemo } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import {
  Container, GlobalStyles,
} from '@mui/material';
import { Setup, NotFound } from '@components';
import { theme, globalStyle, viewState } from '@constants';

const App: FC = () => {
  const [view, setView] = useState<ViewState>(viewState.SETUP);
  // Will add the component which consumes game data later.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      default:
        return <NotFound onBackToSetup={handleRedirectBackToSetup} />;
    }
  }, [view]);

  return (
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
          {currentView}
        </Container>
      </ThemeProvider>
    </>
  );
};

export default App;
