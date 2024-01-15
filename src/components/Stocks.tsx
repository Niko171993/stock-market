import SingleStock from './SingleStock';

import { useSimulatedContext } from '../contexts/StockAPIContext';
import { Link } from 'react-router-dom';
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

  return (
    <>
      {content}
      <Link className="stock__singleBtn" to={`/admin`}>
        Link To Admin
      </Link>
    </>
  );
};

export default Stocks;
