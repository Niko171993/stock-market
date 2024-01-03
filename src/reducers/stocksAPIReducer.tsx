import React from 'react';

const stocksAPIReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: true };
    case 'SET_LOADING_FALSE':
      return { ...state, isLoading: false };
    case 'UPDATESIMULATEDSTOCKS':
      return { ...state, simulatedStocks: action.payload };
    default:
      return state;
  }
};
export default stocksAPIReducer;
