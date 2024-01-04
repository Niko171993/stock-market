import { StocksDataType } from 'Types/Types';
import SingleStock from './SingleStock';
import { useEffect, useState } from 'react';
import { useSimulatedContext } from '../contexts/StockAPIContext';
type newSimulationType = {
  id: number;
  companyName: string;
  stockName: string;
  data: { date: string; price: number }[];
};

const Stocks = ({ stocksData }: StocksDataType) => {
  // const [newData, setNewData] = useState<newSimulationType[] | []>([]);
  // const [isLoading, setIsLoading] = useState(false);
  const {
    updateSimulatedStocks,
    isLoading,
    simulatedStocks: newData,
    setLoading,
    setLoadingFalse,
  } = useSimulatedContext();

  const simulatePrice = (price: number) => {
    const randomFactor = Math.random() * 10 - 5;
    const newAmount = price * (1 + randomFactor / 100);
    return newAmount;
  };

  const tempStocks = () => {
    setLoading();
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
      // mainRef.current = tempStocksData;
      updateSimulatedStocks(tempStocksData);
    } catch (error) {
      console.error('Error in tempStocks:', error);
    } finally {
      setLoadingFalse();
    }
  };

  useEffect(() => {
    // const timeout = setTimeout(tempStocks, 30000);
    // return () => clearTimeout(timeout);
  }, [tempStocks]);

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
