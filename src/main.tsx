import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { MantineProvider, createTheme } from '@mantine/core';

// Import Mantine styles BEFORE app styles so app styles can override
import '@mantine/core/styles.css';
import './index.css';

import App from './App.tsx';

// Configure Mantine to not override app styles
const theme = createTheme({
  /* Put your mantine theme override here */
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>
);
