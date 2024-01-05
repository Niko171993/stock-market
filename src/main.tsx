import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
// import './index.css';
import './SASS/styles.scss';
import StocksAPIContext from './contexts/StockAPIContext.tsx';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <StocksAPIContext>
    <App />
  </StocksAPIContext>
);
