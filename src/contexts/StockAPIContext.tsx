import { createContext } from 'react';
import React from 'react';
import { SimulatedContextType, SingleStockType } from '../Types/Types';
import stocksAPIReducer from '../reducers/stocksAPIReducer';
import { useReducer } from 'react';
import { UPDATESIMULATEDSTOCKS } from '../actions/SimulatedActions';
import { useContext } from 'react';
import useChangeTime from '../custom-hooks/useChangeTime';
//
import { useEffect } from 'react';
import { format } from 'date-fns';

//
import { stocksData } from '../data/stocks';
const loadStocksFromStorage = () => {
  let stocks = JSON.parse(localStorage.getItem('stocks')!);
  if (stocks && stocks.length) {
    const main = useChangeTime(stocks);
    return main;
  } else {
    const oldStocks = useChangeTime(stocksData);
    localStorage.setItem('stocks', JSON.stringify(oldStocks));
    return oldStocks;
  }
};
const initialState = {
  isLoading: false,
  simulatedStocks: loadStocksFromStorage(),
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

  const tempStocks = () => {
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

      localStorage.setItem('stocks', JSON.stringify(tempStocksData));
      updateSimulatedStocks(tempStocksData);
    } catch (error) {
      console.error('Error in tempStocks:', error);
    } finally {
    }
  };

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
