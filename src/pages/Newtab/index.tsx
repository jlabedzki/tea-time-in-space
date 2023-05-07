import { CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import { createRoot } from 'react-dom/client';
import Newtab from 'pages/Newtab/Newtab';
import theme from '../../theme';
import './index.css';

const container = document.getElementById('app-container');
// eslint-disable no-non-null-assertion
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Newtab />
    </ThemeProvider>
  </React.StrictMode>
);
