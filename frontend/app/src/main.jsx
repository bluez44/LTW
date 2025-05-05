import { createContext, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router';

import '../mazer/compiled/css/app.css';
import '../mazer/compiled/css/app-dark.css';
import '../mazer/compiled/css/iconly.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/custom.css';
import './index.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import App from './App.jsx';

export const ThemeContext = createContext({});

const theme = localStorage.getItem('theme') || 'light';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeContext.Provider value={{ theme }}>
      <Router>
        <App />
      </Router>
    </ThemeContext.Provider>
  </StrictMode>,
);
