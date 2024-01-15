import React from 'react';
import { useSimulatedContext } from '../contexts/StockAPIContext';
import { useState } from 'react';
import Table from '../components/Table';
const AdminPage = () => {
  const { simulatedStocks, updateSimulatedStocks } = useSimulatedContext();
  const [editID, setEditID] = useState<number | null>();
  const [editing, setEditing] = useState<boolean>(false);
  const [companyName, setCompanyName] = useState<string>('');
  const [stockName, setStockName] = useState<string>('');
  const handleEdit = (id: number) => {
    setEditing(true);
    setEditID(id);
    const stock = simulatedStocks.find((stock) => stock.id === Number(id));
    const { companyName, stockName } = stock!;
    setStockName(() => stockName);
    setCompanyName(() => companyName);
  };
  const disableEditing = () => {
    setEditing(false);
    setEditID(null);
    setStockName('');
    setCompanyName('');
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const editedStocks = simulatedStocks.map((stock) => {
      if (stock.id === editID) {
        return { ...stock, companyName: companyName, stockName: stockName };
      } else {
        return stock;
      }
    });
    updateSimulatedStocks(editedStocks);
    setEditing(false);
    setEditID(null);
    setStockName('');
    setCompanyName('');
  };

  return (
    <div className="center">
      <div className="admin">
        <div>
          <Table editID={editID} onEdit={handleEdit} />
        </div>
        <div className="admin__edit">
          {editing && (
            <form className="admin__form" onSubmit={handleSubmit}>
              <div className="form-control">
                <label>Company Name</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="company Name"
                />
              </div>
              <div className="form-control">
                <label>Stock Name</label>
                <input
                  type="text"
                  value={stockName}
                  onChange={(e) => setStockName(e.target.value)}
                  placeholder="stock Name"
                />
              </div>
              <div className="form-control">
                <div>
                  <button type="submit">Submit</button>
                  <button onClick={disableEditing}>Cancel</button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
