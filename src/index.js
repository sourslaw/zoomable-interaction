import './App.css';

import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';

// Suppress ResizeObserver loop errors - these are harmless warnings
// that commonly occur with OpenSeadragon and similar libraries
const resizeObserverLoopErrRe = /^[^(ResizeObserver loop completed with undelivered notifications|ResizeObserver loop limit exceeded)]/;
const resizeObserverLoopErr = (e) => {
  if (
    e.message === 'ResizeObserver loop completed with undelivered notifications.' ||
    e.message === 'ResizeObserver loop limit exceeded'
  ) {
    const resizeObserverErr = document.getElementById('webpack-dev-server-client-overlay');
    if (resizeObserverErr) {
      resizeObserverErr.style.display = 'none';
    }
  }
};

window.addEventListener('error', resizeObserverLoopErr);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
