import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
// import './index.css';
import './SASS/styles.scss';
import StocksAPIContext from './contexts/StockAPIContext.tsx';
import { BrowserRouter as Router } from 'react-router-dom';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <StocksAPIContext>
    <Router>
      <App />
    </Router>
  </StocksAPIContext>
);
