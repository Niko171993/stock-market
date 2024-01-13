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
  simulatedStocks: SingleStockType[] | [];
  updateSimulatedStocks: (newData: SingleStockType[]) => void;
  setLoading: () => void;
  setLoadingFalse: () => void;
};
export type ModalType = {
  id: number;
  isOpen: boolean;
  companyName: string;
  stockName: string;
  data: { date: string; price: number }[];
  setIsOpen: (data: boolean) => void;
};

export type OfficialDataType = {
  date: string;
  price: number;
  time?: string;
};
export type OfficialDataTypeObj = {
  data: { date: string; price: number; time?: string }[];
};
export type MainSettingsType = {
  dots: boolean;
  infinite: boolean;
  speed: number;
  slidesToShow: number;
  slidesToScroll: number;
};
