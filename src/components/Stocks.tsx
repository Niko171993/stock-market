import SingleStock from './SingleStock';

import { useSimulatedContext } from '../contexts/StockAPIContext';

const Stocks = () => {
  const { isLoading, simulatedStocks: newSimulatedData } =
    useSimulatedContext();

  let content: JSX.Element | string;
  if (isLoading) {
    content = '...loading';
  } else if (newSimulatedData.length) {
    content = (
      <>
        {newSimulatedData.map((stock) => (
          <SingleStock key={stock.id} {...stock} />
        ))}
      </>
    );
  } else {
    content = <div>some sort of a weird error</div>;
  }

  return <>{content}</>;
};

export default Stocks;
