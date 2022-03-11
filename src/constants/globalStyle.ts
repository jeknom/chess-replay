import { Theme } from '@mui/material';
import { Interpolation } from '@emotion/react';

const globalStyle: Interpolation<Theme> = {
  'html, body, #root, #root>div ': {
    width: '100%',
    height: '100%',
  },
};

export default globalStyle;
