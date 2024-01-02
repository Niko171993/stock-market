import { StocksDataType } from 'Types/Types';
import SingleStock from './SingleStock';

import { useEffect, useState } from 'react';
type newSimulationType = {
  id: number;
  companyName: string;
  stockName: string;
  data: { date: string; price: number }[];
};

const Stocks = ({ stocksData }: StocksDataType) => {
  const [newData, setNewData] = useState<newSimulationType[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);

  const simulatePrice = (price: number) => {
    const randomFactor = Math.random() * 10 - 5;
    const newAmount = price * (1 + randomFactor / 100);
    return newAmount;
  };
  const tempStocks = async () => {
    setIsLoading(true);
    const tempStocksData = stocksData.map((stock) => {
      const newDate = new Date().toISOString();
      const newNumber = simulatePrice(stock.data[stock.data.length - 1].price);
      return {
        ...stock,
        data: {
          ...stock.data,
          date: newDate,
          price: newNumber,
        },
      };
    });
    setIsLoading(false);
    setNewData(tempStocksData);
  };

  useEffect(() => {
    const simulator = setTimeout(tempStocks, 5000);
    return () => clearTimeout(simulator);
  }, []);

  let content: JSX.Element | string;
  if (isLoading) {
    content = '...loading';
  } else if (newData.length) {
    content = (
      <>
        {newData.map((stock) => (
          <SingleStock key={stock.id} {...stock} />
        ))}
      </>
    );
    // content = <></>;
    alert('new data');
    console.log(newData);
  } else {
    content = (
      <>
        {stocksData.map((stock) => (
          <SingleStock key={stock.id} {...stock} />
        ))}
      </>
    );
  }

  return <>{content}</>;
};

export default Stocks;
