import React, { FC, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  DialogProps,
  Button,
  Typography,
} from '@mui/material';
import AceEditor from 'react-ace';
import { isValidGameData } from '@utils';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-monokai';

interface JsonImportDialogProps {
  onSubmitGameData: (gameData: GameData) => void;
}

const JsonImportDialog: FC<JsonImportDialogProps & DialogProps> = ({
  onClose,
  onSubmitGameData,
  ...rest
}) => {
  const [json, setJson] = useState('{}');
  const [error, setError] = useState('');

  const handleChange = (newValue: string) => {
    setError('');
    setJson(newValue);

    try {
      const data = JSON.parse(newValue) as object;
      if (isValidGameData(data)) {
        return;
      }
    } catch (e) {
      // It is a false positive
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const errorMessage = e?.message as string || '';
      const match = errorMessage.match(/line \d column \d/);

      if (match) {
        setError(`There is an error on ${match[0]}`);
      } else {
        setError('Failed to parse game data');
      }

      return;
    }
    setError('Invalid game data format');
  };

  const handleSubmit = () => {
    onSubmitGameData(JSON.parse(json) as GameData);
  };

  const handleClose = () => {
    if (onClose) {
      onClose({}, 'escapeKeyDown');
    }
  };

  return (
    <Dialog {...rest} onClose={onClose} fullScreen>
      <DialogTitle>Import game data</DialogTitle>
      <DialogContent>
        <AceEditor
          mode='json'
          theme='monokai'
          name='Game data'
          onChange={handleChange}
          fontSize={14}
          width='100%'
          height='100%'
          showGutter
          highlightActiveLine
          value={json}
          setOptions={{
            showLineNumbers: true,
            tabSize: 2,
            useWorker: true,
          }}
        />
      </DialogContent>
      <DialogActions>
        {error !== '' && <Typography variant='body1' color='red' sx={{ marginRight: 2 }}>{error}</Typography>}
        <Button disabled={error !== ''} variant='outlined' onClick={handleSubmit}>Import</Button>
        <Button variant='outlined' onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default JsonImportDialog;
