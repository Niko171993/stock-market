export type StocksDataType = {
  stocksData: {
    id: number;
    companyName: string;
    stockName: string;
    data: { date: string; price: number }[];
  }[];
};
export type SingleStockType = {
  id: number;
  companyName: string;
  stockName: string;
  data: { date: string; price: number }[];
};
export type SimulatedContextType = {
  isLoading: boolean;
  simulatedStocks:
    | {
        id: number;
        companyName: string;
        stockName: string;
        data: { date: string; price: number }[];
      }[]
    | [];
  updateSimulatedStocks: (newData: SingleStockType[]) => void;
  setLoading: () => void;
  setLoadingFalse: () => void;
};
