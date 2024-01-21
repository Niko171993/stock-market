import React from 'react';
import { useSimulatedContext } from '../contexts/StockAPIContext';

const Table = ({ editID, onEdit }) => {
  const { simulatedStocks } = useSimulatedContext();
  const headers = (
    <tr className="admin__tr">
      <th className="admin__th">id</th>
      <th className="admin__th">image</th>
      <th className="admin__th">companyName</th>
      <th className="admin__th">stockName</th>
      <th className="admin__th">date/price</th>
    </tr>
  );
  const handleEdit = (id: number) => {
    onEdit(id);
  };
  const cells = simulatedStocks.map((stock) => {
    const { id, companyName, stockName, data, img } = stock;
    const makeGold = id === editID;

    return (
      <tr key={id} className={`${makeGold && 'admin__gold'}`}>
        <td className="admin__td">{id}</td>
        <td className="admin__td">
          <img className="table-img" src={img || ''} alt={id} />
        </td>
        <td className="admin__td">{companyName}</td>
        <td className="admin__td">{stockName}</td>
        <td className="admin__td">
          <span>date: {data[data.length - 1].date} </span>
          <span>price: ${data[data.length - 1].price}</span>
        </td>
        <td className="admin__td">
          <button className="admin__editBtn" onClick={() => handleEdit(id)}>
            Edit
          </button>
        </td>
      </tr>
    );
  });
  return (
    <table className="admin__table">
      <thead>{headers}</thead>
      <tbody>{cells}</tbody>
    </table>
  );
};

export default Table;
