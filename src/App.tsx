import React, { useRef } from 'react';

import { Stocks } from './components/index';
import { stocksData } from './data/stocks';
const App = () => {
  return (
    <section>
      <div className="section-center">
        <Stocks stocksData={stocksData} />
      </div>
    </section>
  );
};

export default App;
