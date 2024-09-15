import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { GlobalProvider } from './GlobalState';
import 'leaflet/dist/leaflet.css';

ReactDOM.render(
  <GlobalProvider>
    <App />
  </GlobalProvider>,
  document.getElementById('root')
);
