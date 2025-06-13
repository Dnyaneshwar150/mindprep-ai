'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#228B22',
        },
        secondary: {
            main: '#f50057',
        },
    },
      typography: {
    fontFamily: 'var(--font-poppins), sans-serif',
  },
});

export default theme;
