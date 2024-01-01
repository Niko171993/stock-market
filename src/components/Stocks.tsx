import { StocksDataType } from 'Types/Types';
import SingleStock from './SingleStock';

const Stocks = ({ stocksData }: StocksDataType) => {
  const renderedData = stocksData.map((stock) => {
    return <SingleStock key={stock.id} {...stock} />;
  });

  return <>{renderedData}</>;
};

export default Stocks;
