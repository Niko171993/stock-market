import { StocksDataType } from 'Types/Types';
import SingleStock from './SingleStock';
import { useEffect, useState } from 'react';
import { useSimulatedContext } from '../contexts/StockAPIContext';
import { SingleStockType } from 'Types/Types';
const Stocks = ({ stocksData }: StocksDataType) => {
  // const [newData, setNewData] = useState<newSimulationType[] | []>([]);
  // const [isLoading, setIsLoading] = useState(false);
  const [stocksDataArray, setStocksDataArray] = useState<
    SingleStockType[] | []
  >([]);
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
  const changeTime = () => {
    const main = stocksData.map((stock) => {
      let { data } = stock;
      console.log('alert');
      const milli = 15 * 1000;
      let totalMilli = milli * 4;
      let milliArray: number[] = [];
      while (totalMilli > 0) {
        milliArray = [...milliArray, totalMilli - milli];
        totalMilli -= milli;
      }

      data = data.map((item, index) => {
        let { date, price }: { date: any; price: number } = item;
        let newDate = new Date().getTime();
        const newTime = Number(newDate) - milliArray[index];
        date = new Date(newTime).toISOString();
        return { date, price };
      });
      return { ...stock, data };
    });
    console.log(main);
    setStocksDataArray(() => main);
  };
  const tempStocks = () => {
    setLoading();
    let main = [];
    if (newData.length) {
      main = newData;
    } else {
      main = stocksDataArray;
    }
    try {
      console.log(main, 'this is the main');
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
    changeTime();
    alert('change tiem');
  }, []);
  useEffect(() => {
    const timeout = setTimeout(tempStocks, 30000);
    return () => clearTimeout(timeout);
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
        {stocksDataArray.map((stock) => (
          <SingleStock key={stock.id} {...stock} />
        ))}
      </>
    );
  }

  return <>{content}</>;
};

export default Stocks;
