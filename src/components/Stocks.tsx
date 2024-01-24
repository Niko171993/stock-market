import TempSingleStock from './TempSingleStock';
import { useSimulatedContext } from '../contexts/StockAPIContext';

const Stocks = () => {
  const { simulatedStocks } = useSimulatedContext();

  let content: JSX.Element | string;

  content = (
    <>
      {simulatedStocks.map((stock) => (
        <TempSingleStock key={stock.id} {...stock} />
      ))}
    </>
  );

  return <div className="section-center">{content}</div>;
};

export default Stocks;
