import { StocksDataType } from 'Types/Types';
import SingleStock from './SingleStock';

import { useEffect, useRef, useState } from 'react';
type newSimulationType = {
  id: number;
  companyName: string;
  stockName: string;
  data: { date: string; price: number }[];
};

const Stocks = ({ stocksData }: StocksDataType) => {
  const [newData, setNewData] = useState<newSimulationType[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const mainRef = useRef<newSimulationType[] | []>([]);
  const simulatePrice = (price: number) => {
    const randomFactor = Math.random() * 10 - 5;
    const newAmount = price * (1 + randomFactor / 100);
    return newAmount;
  };

  const tempStocks = async () => {
    setIsLoading(true);
    let main = [];
    if (newData.length) {
      main = newData;
    } else {
      main = stocksData;
    }
    try {
      const tempStocksData = main.map((stock) => {
        const newDate = new Date().toISOString();
        const newNumber = parseFloat(
          simulatePrice(stock.data[stock.data.length - 1].price).toFixed(2)
        );
        return {
          ...stock,
          data: [...stock.data, { date: newDate, price: newNumber }],
        };
      });
      mainRef.current = tempStocksData;
      setNewData(() => mainRef.current);
    } catch (error) {
      console.error('Error in tempStocks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setInterval(tempStocks, 15000);
    return () => clearInterval(timeout);
  }, [newData]);

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

    alert('new data');
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
