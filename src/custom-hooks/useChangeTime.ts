import { OfficialDataTypeObj, SingleStockType } from 'Types/Types';
import { format } from 'date-fns';
const useChangeTime = (stocks: SingleStockType[]) => {
  const newDate = new Date().getTime();
  const main = stocks!.map((stock: SingleStockType) => {
    let { data }: OfficialDataTypeObj = stock;
    const milli = 15 * 1000;
    let totalMilli = milli * stocks.length;
    let milliArray: number[] = [];
    while (totalMilli > 0) {
      const newMilli = totalMilli - milli;
      milliArray = [...milliArray, newMilli];
      totalMilli -= milli;
    }

    const adjustedData = data.map(
      (item: { date: string; price: number; time?: string }, index) => {
        const { price }: { date?: string; price: number } = item;
        const newTime = Number(newDate) - milliArray[index];
        const stringTime = new Date(newTime).toISOString();
        const updatedDate = format(stringTime, 'HH:mm:ss');

        return { date: updatedDate, price };
      }
    );

    return { ...stock, data: adjustedData };
  });
  return main;
};

export default useChangeTime;
