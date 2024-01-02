import React, { useRef } from 'react';
import { useState, useEffect } from 'react';

const App = () => {
  const [counter, setCounter] = useState(0);
  const countRef = useRef(0);
  countRef.current = counter;
  const updateCounter = async () => {
    setCounter((counter) => counter + 1);
  };
  const showCounter = () => {
    alert(countRef.current);
  };
  useEffect(() => {
    const interval = setTimeout(showCounter, 5000);
    return () => clearTimeout(interval);
  }, []);
  return (
    <div>
      <div style={{ color: 'white' }}>{counter}</div>
      <button onClick={updateCounter}>update</button>
      <button onClick={showCounter}>show</button>
    </div>
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
