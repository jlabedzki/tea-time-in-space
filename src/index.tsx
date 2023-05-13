import { CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createRoot } from 'react-dom/client';
import App from './App';
import theme from './theme';
import './index.css';

const queryClient = new QueryClient();

const container = document.getElementById('app-container');
// eslint-disable no-non-null-assertion
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <App />
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);
