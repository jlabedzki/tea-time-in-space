import React from 'react';
import { createRoot } from 'react-dom/client';
import Newtab from 'pages/Newtab/Newtab';
import './index.css';

const container = document.getElementById('app-container');
// eslint-disable no-non-null-assertion
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <Newtab />
  </React.StrictMode>
);
