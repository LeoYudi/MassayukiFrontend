'use client';
import { createTheme } from '@mui/material/styles';

import { ptBR as coreBR } from '@mui/material/locale';
import ptBR from 'dayjs/locale/pt-br';

export const theme = createTheme(
  {
    palette: {
      mode: 'light',
      primary: {
        main: '#E9353A',
      },
      secondary: {
        main: '#1976d2',
      },
    },
  },
  ptBR,
  coreBR
);
