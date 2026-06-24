import React from 'react';
import { createRoot } from 'react-dom/client';
import './assets/css/index.css';
import './assets/css/App.css';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals.js';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint.
reportWebVitals();
