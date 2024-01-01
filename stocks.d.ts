declare module '*./data/stocks' {
  const stocks: Array<{
    id: number;
    companyName: string;
    stockName: string;
    price: number;
  }>;

  export default stocks;
}
