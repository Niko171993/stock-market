import React, { useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Stocks } from './components/index';
import { stocksData } from './data/stocks';
import { StocksLayout } from './components/index';
const App = () => {
  return (
    <section>
      <Routes>
        <Route path="/" element={<StocksLayout />}>
          <Route index element={<Stocks stocksData={stocksData} />} />
        </Route>
      </Routes>
    </section>
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
