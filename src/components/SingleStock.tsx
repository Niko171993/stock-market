import { SingleStockType } from 'Types/Types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import bull from '../images/bull.jpg';
import gucci from '../images/gucci.jpg';
import { Modal } from './index';
import { useState, useEffect } from 'react';
const SingleStock = ({ companyName, stockName, data }: SingleStockType) => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    // Disable scrolling when the modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable scrolling when the modal is closed
      document.body.style.overflow = 'auto';
    }

    // Cleanup: Re-enable scrolling when the component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  return (
    <article className="stock">
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        companyName={companyName}
        stockName={stockName}
        data={data}
        gucci={gucci}
      />
      <div className="stock__img">
        <h3>{stockName} Chart</h3>
        <ResponsiveContainer width="99%" height="100%" className="bar">
          <BarChart width={500} height={300} data={data}>
            <XAxis
              dataKey="date"
              tick={{ fill: 'white' }}
              axisLine={{ stroke: 'white' }}
            />
            <YAxis
              type="number"
              tick={{ fill: 'white' }}
              axisLine={{ stroke: 'white' }}
            />
            <Tooltip
              contentStyle={{
                background: 'white !important',
                color: 'white !important',
              }}
            />
            <Legend />
            <Bar dataKey="price" fill="#8b0000" />
          </BarChart>
        </ResponsiveContainer>
        <div className="bull">
          <img className="bull-img" src={bull} alt="bull" />
        </div>
      </div>

      <div className="stock__info">
        <div className="flex">
          <h5 className="stock__title">Company Name</h5>
          <div>
            <h3 className="stock__subTitle">{companyName}</h3>
          </div>
        </div>

        <div className="flex">
          <h5 className="stock__title">Stock Name</h5>
          <div>
            <p className="stock__subTitle">{stockName}</p>
          </div>
        </div>

        <div className="flex">
          <h5 className="stock__title">Current Price</h5>
          <div>
            <p className="stock__subTitle">$ {data[data.length - 1].price}</p>
          </div>
        </div>
        <div className="flex no-divider">
          <h5 className="stock__title">old Price</h5>
          <div>
            <p className="stock__subTitle">$ {data[data.length - 2].price}</p>
          </div>
        </div>
      </div>
      <button className="single-stock-btn" onClick={() => setIsOpen(true)}>
        View More
      </button>
    </article>
  );
};

export default SingleStock;
