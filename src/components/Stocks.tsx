import SingleStock from './SingleStock';

import { useSimulatedContext } from '../contexts/StockAPIContext';

const Stocks = () => {
  const { simulatedStocks: newSimulatedData } = useSimulatedContext();

  let content: JSX.Element | string;

  content = (
    <>
      {newSimulatedData.map((stock) => (
        <SingleStock key={stock.id} {...stock} />
      ))}
    </>
  );

  return <div className="section-center">{content}</div>;
};

export default Stocks;
