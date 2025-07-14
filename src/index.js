import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {VirtualizationProvider} from './context/VirtualizationContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <VirtualizationProvider>
    <App />
    </VirtualizationProvider>
  </React.StrictMode>

);