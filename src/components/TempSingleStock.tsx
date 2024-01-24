import { SingleStockType } from 'Types/Types';

import SingleStock from './SingleStock';

const TempSingleStock = ({
  companyName,
  stockName,
  data,
  id,
}: SingleStockType) => {
  //i do this because, i cant operate on state here, so I need local Storage
  const dataItems = JSON.parse(localStorage.getItem('stocks')!);
  if (dataItems) {
    const item = dataItems.find(
      (stock: SingleStockType) => stock.id === Number(id)
    );
    let { companyName, stockName, data, id: newId } = item;

    let newData = data.slice(-5);

    return (
      <SingleStock
        companyName={companyName}
        stockName={stockName}
        data={newData}
        id={newId}
      />
    );
  }

  return (
    <SingleStock
      companyName={companyName}
      stockName={stockName}
      data={data}
      id={id}
    />
  );
};

export default TempSingleStock;
