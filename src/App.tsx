import React, { useRef, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Stocks } from './components/index';

import { StocksLayout } from './components/index';
import SingleStockPage from './pages/SingleStockPage';
import AdminPage from './pages/AdminPage';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<StocksLayout />}>
          <Route index element={<Stocks />} />
          <Route path="/:id" element={<SingleStockPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Route>
      </Routes>
    </>
  );
  // return (
  //   <section>
  //     <div className="section-center">
  //       <Stocks stocksData={stocksData} />
  //     </div>
  //   </section>
  // );
};

export default App;
