import React from 'react';
import { useSimulatedContext } from '../contexts/StockAPIContext';
import { useState, useEffect } from 'react';
import Table from '../components/Table';
const AdminPage = () => {
  const { simulatedStocks, updateSimulatedStocks } = useSimulatedContext();
  const [editID, setEditID] = useState<number | null>();
  const [editing, setEditing] = useState<boolean>(false);
  const [editCompanyName, setEditCompanyName] = useState<string>('');
  const [editStockName, setEditStockName] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [img, setImg] = useState<any>(null);

  const handleImg = (e: any) => {
    const file = e.target.files;
    if (file && file.length > 0) setImg(file[0]);
  };

  const handleEdit = (id: number) => {
    setEditing(true);
    setEditID(id);
    const stock = simulatedStocks.find((stock) => stock.id === Number(id));
    const { companyName, stockName } = stock!;
    setEditStockName(() => stockName);
    setEditCompanyName(() => editCompanyName);
  };
  const disableEditing = () => {
    setEditing(false);
    setEditID(null);
    setEditStockName('');
    setEditCompanyName('');
    setOpen(false);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editCompanyName && !editing) {
      const lastId = simulatedStocks[simulatedStocks.length - 1].id + 1;
      const data = simulatedStocks[simulatedStocks.length - 5].data;
      const newImage = URL.createObjectURL(img);
      const newStock = {
        id: lastId,
        companyName: editCompanyName,
        stockName: editStockName,
        data: data,
        img: newImage,
      };
      const newStocks = [...simulatedStocks, newStock]!;
      updateSimulatedStocks(newStocks);
      setOpen(false);
      setEditStockName('');
      setEditCompanyName('');
    }
    if (editing) {
      const editedStocks = simulatedStocks.map((stock) => {
        if (stock.id === editID) {
          return {
            ...stock,
            companyName: editCompanyName,
            stockName: editStockName,
          };
        } else {
          return stock;
        }
      });

      updateSimulatedStocks(editedStocks);
      setEditing(false);
      setEditID(null);
      setEditStockName('');
      setEditCompanyName('');
    }
  };
  useEffect(() => {
    localStorage.setItem('stocks', JSON.stringify(simulatedStocks));
  }, [simulatedStocks]);
  useEffect(() => {
    updateSimulatedStocks(simulatedStocks.sort((a, b) => b.id - a.id));
  }, []);
  return (
    <div className="center">
      <div className="admin">
        <div className="row row-end add-item">
          <button className="btn" onClick={() => setOpen(true)}>
            Add Item
          </button>
        </div>
        <div className="table-container">
          <Table editID={editID} onEdit={handleEdit} />
        </div>

        <div className="admin__edit">
          {editing ||
            (open && (
              <form className="admin__form" onSubmit={handleSubmit}>
                <div className="form-control">
                  <label>Company Name</label>
                  <input
                    type="text"
                    value={editCompanyName}
                    onChange={(e) => setEditCompanyName(e.target.value)}
                    placeholder="company Name"
                  />
                </div>
                <div className="form-control">
                  <label>Stock Name</label>
                  <input
                    type="text"
                    value={editStockName}
                    onChange={(e) => setEditStockName(e.target.value)}
                    placeholder="stock Name"
                  />
                </div>
                <div className="form-control">
                  <label htmlFor="forImage">Image</label>
                  <input
                    id="forImage"
                    type="file"
                    onChange={handleImg}
                    placeholder="stock Name"
                  />
                </div>
                <div className="form-control">
                  <div>
                    <button type="submit">{editing ? 'edit' : 'submit'}</button>
                    <button onClick={disableEditing}>Cancel</button>
                  </div>
                </div>
              </form>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
