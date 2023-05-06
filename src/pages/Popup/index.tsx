import React from 'react';
import { createRoot } from 'react-dom/client';
import Popup from 'pages/Popup/Popup';
import './index.css';

const container = document.getElementById('app-container');
// eslint-disable no-non-null-assertion
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);
