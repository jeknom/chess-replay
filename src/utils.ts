// Might add more utils later so this error is not valid
/* eslint-disable import/prefer-default-export */
export const isValidGameData = (data: object): data is GameData => 'name' in data
  && 'size' in data
  && 'players' in data
  && 'board' in data
  && 'history' in data;
