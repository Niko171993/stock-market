import { StocksDataType } from 'Types/Types';
import SingleStock from './SingleStock';
import { useEffect, useState } from 'react';
import { useSimulatedContext } from '../contexts/StockAPIContext';
import { SingleStockType } from 'Types/Types';
import { format } from 'date-fns';

import { OfficialDataTypeObj } from 'Types/Types';
const Stocks = ({ stocksData }: StocksDataType) => {
  // const [newData, setNewData] = useState<newSimulationType[] | []>([]);
  // const [isLoading, setIsLoading] = useState(false);
  const [stocks, setStocks] = useState<SingleStockType[] | []>([]);
  const {
    updateSimulatedStocks,
    isLoading,
    simulatedStocks: newSimulatedData,
    setLoading,
    setLoadingFalse,
  } = useSimulatedContext();

  const simulatePrice = (price: number) => {
    const randomFactor = Math.random() * 10 - 5;
    const newAmount = price * (1 + randomFactor / 100);
    return newAmount;
  };

  const changeTime = () => {
    const main = stocksData.map((stock) => {
      let { data }: OfficialDataTypeObj = stock;
      const milli = 15 * 1000;
      let totalMilli = milli * 4;
      let milliArray: number[] = [];
      while (totalMilli > 0) {
        milliArray = [...milliArray, totalMilli - milli];
        totalMilli -= milli;
      }

      const adjustedData = data.map(
        (item: { date: string; price: number; time?: string }, index) => {
          let { date, price }: { date: number | string; price: number } = item;
          let newDate = new Date().getTime();
          const newTime = Number(newDate) - milliArray[index];
          date = new Date(newTime).toISOString();
          date = format(date, 'HH:mm:ss');

          return { date, price };
        }
      );

      return { ...stock, data: adjustedData };
    });

    setStocks(() => main);
  };
  const tempStocks = () => {
    setLoading();
    let main = [];
    if (newSimulatedData.length) {
      main = newSimulatedData;
    } else {
      main = stocks;
    }
    try {
      const tempStocksData = main.map((stock) => {
        let newDate = new Date().toISOString();
        newDate = format(newDate, 'HH:mm:ss');
        const newNumber = parseFloat(
          simulatePrice(stock.data[stock.data.length - 1].price).toFixed(2)
        );
        return {
          ...stock,
          data: [...stock.data, { date: newDate, price: newNumber }],
        };
      });

      updateSimulatedStocks(tempStocksData);
    } catch (error) {
      console.error('Error in tempStocks:', error);
    } finally {
      setLoadingFalse();
    }
  };
  useEffect(() => {
    changeTime();
  }, []);
  useEffect(() => {
    const timeout = setTimeout(tempStocks, 30000);
    return () => clearTimeout(timeout);
  }, [tempStocks]);

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
    content = (
      <>
        {stocks.map((stock) => (
          <SingleStock key={stock.id} {...stock} />
        ))}
      </>
    );
  }

  return <>{content}</>;
};

export default Stocks;
