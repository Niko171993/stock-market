import { createContext } from 'react';
import React from 'react';
import { SimulatedContextType, SingleStockType } from '../Types/Types';
import stocksAPIReducer from '../reducers/stocksAPIReducer';
import { useReducer } from 'react';
import { UPDATESIMULATEDSTOCKS } from '../actions/SimulatedActions';
import { useContext } from 'react';

const initialState = {
  isLoading: false,
  simulatedStocks: [],
  updateSimulatedStocks: (): void => {},
  setLoading: () => {},
  setLoadingFalse: () => {},
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
  return (
    <SimulatedContext.Provider
      value={{ ...state, updateSimulatedStocks, setLoading, setLoadingFalse }}
    >
      {children}
    </SimulatedContext.Provider>
  );
};
export const useSimulatedContext = () => {
  return useContext(SimulatedContext);
};

export default StocksAPIContext;
