import React, {
  ChangeEvent, FC, FormEvent, useState,
} from 'react';
import {
  IconButton, InputAdornment, InputLabel, Paper, TextField, Typography, Box, Button,
} from '@mui/material';
import { isValidGameData } from '@utils';
import { ChevronRight } from '@mui/icons-material';
import mockGameData from '../../mock/mock-game.json';
import LoadingContainer from './LoadingContainer';

interface SetupProps {
  onSetGameData: (data: GameData) => void;
}

const Setup: FC<SetupProps> = ({ onSetGameData }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const hasError = error !== '' && error !== undefined;

  const handleFetchGameData = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(url);
      setIsLoading(false);
      const gameData: GameData = await response.json() as GameData;

      if (isValidGameData(gameData)) {
        onSetGameData(gameData);

        return;
      }
    } catch (e) {
      setError('Request failed or the return type was not JSON');
      setIsLoading(false);

      return;
    }

    setError('Invalid game data, check that the URL is correct');
  };

  const handleSetMockGameData = () => {
    onSetGameData(mockGameData);
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await handleFetchGameData();
  };

  const handleUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (error !== '') {
      setError('');
    }

    setUrl(event.target.value);
  };

  return (
    <Paper
      sx={{
        marginTop: '30vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 350,
        padding: 2,
        gap: 2,
      }}
    >
      <Typography variant='h5'>Chess replay</Typography>
      <img src='/wn.svg' alt='White knight chess piece icon' width={100} height={100} />
      <InputLabel>Game data URL</InputLabel>
      <form onSubmit={handleFormSubmit}>
        <TextField
          fullWidth
          placeholder='https://your-game-data.com'
          value={url}
          onChange={handleUrlChange}
          error={hasError}
          helperText={hasError && error}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <LoadingContainer size={20} isLoading={isLoading}>
                  <IconButton color='primary' onClick={handleFetchGameData} disabled={url === ''}>
                    <ChevronRight />
                  </IconButton>
                </LoadingContainer>
              </InputAdornment>
            ),
          }}
        />
      </form>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Button variant='outlined' onClick={handleSetMockGameData}>Demo</Button>
      </Box>
    </Paper>
  );
};

export default Setup;
