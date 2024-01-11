import { createContext } from 'react';
import React from 'react';
import { SimulatedContextType, SingleStockType } from '../Types/Types';
import stocksAPIReducer from '../reducers/stocksAPIReducer';
import { useReducer } from 'react';
import { UPDATESIMULATEDSTOCKS } from '../actions/SimulatedActions';
import { useContext } from 'react';
//

import { useEffect } from 'react';
import { format } from 'date-fns';
import { OfficialDataTypeObj } from 'Types/Types';
//
import { stocksData } from '../data/stocks';

const initialState = {
  isLoading: false,
  simulatedStocks: [...stocksData],
  updateSimulatedStocks: (): void => {},
  setLoading: () => {},
  setLoadingFalse: () => {},
  stocks: [],
  stocksData: [],
};
export type ChildrenType = {
  children: React.ReactNode;
};
const SimulatedContext = createContext<SimulatedContextType>(initialState);
const StocksAPIContext = ({ children }: ChildrenType) => {
  const [state, dispatch] = useReducer(stocksAPIReducer, initialState);

  const updateSimulatedStocks = (newData: SingleStockType[]): void => {
    dispatch({ type: UPDATESIMULATEDSTOCKS, payload: newData });
  };
  const setLoading = () => {
    dispatch({ type: 'SET_LOADING' });
  };
  const setLoadingFalse = () => {
    dispatch({ type: 'SET_LOADING_FALSE' });
  };
  const simulatePrice = (price: number) => {
    const randomFactor = Math.random() * 10 - 5;
    const newAmount = price * (1 + randomFactor / 100);
    return newAmount;
  };

  const changeTime = () => {
    setLoading();
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
          let { date, price }: { date: string; price: number } = item;
          let newDate = new Date().getTime();
          const newTime = Number(newDate) - milliArray[index];
          date = new Date(newTime).toISOString();
          date = format(date, 'HH:mm:ss');

          return { date, price };
        }
      );

      return { ...stock, data: adjustedData };
    });

    updateSimulatedStocks(main);
    setLoadingFalse();
  };
  const tempStocks = () => {
    setLoading();
    try {
      const tempStocksData: SingleStockType[] = state.simulatedStocks.map(
        (stock: SingleStockType) => {
          let newDate = new Date().toISOString();
          newDate = format(newDate, 'HH:mm:ss');
          const newNumber = parseFloat(
            simulatePrice(stock.data[stock.data.length - 1].price).toFixed(2)
          );
          return {
            ...stock,
            data: [...stock.data, { date: newDate, price: newNumber }],
          };
        }
      );

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
  return (
    <SimulatedContext.Provider
      value={{
        ...state,
        updateSimulatedStocks,
        setLoading,
        setLoadingFalse,
      }}
    >
      {children}
    </SimulatedContext.Provider>
  );
};
export const useSimulatedContext = () => {
  return useContext(SimulatedContext);
};

export default StocksAPIContext;
