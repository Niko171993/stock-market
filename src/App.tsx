import React, { useRef, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Stocks } from './components/index';

import { StocksLayout } from './components/index';
import SingleStockPage from './pages/SingleStockPage';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<StocksLayout />}>
          <Route index element={<Stocks />} />
        </Route>
        <Route path="/:id" element={<SingleStockPage />} />
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
