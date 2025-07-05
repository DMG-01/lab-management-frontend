import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // ✅ import this
import './index.css';
import App from './App.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   
      <App />
    
  </StrictMode>
);
