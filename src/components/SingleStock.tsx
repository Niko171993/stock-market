import { SingleStockType } from 'Types/Types';

import { format, parseISO } from 'date-fns';
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

export type DataPoint = {
  date: string;
  value: number;
};
export type CustomTooltipProps = {
  active?: boolean;
  payload?: Array<{ payload: DataPoint; value: number }>;
};
const SingleStock = ({ companyName, stockName, data }: SingleStockType) => {
  const [isOpen, setIsOpen] = useState(false);
  data = data.map((item) => {
    let { date, price } = item;
    const dateObject = parseISO(date);
    const formattedDate = format(dateObject, 'yyyy-MM-dd HH:mm:ss');
    date = formattedDate;
    const time = format(date, 'HH:mm:ss');
    return { date, price, time };
  });
  const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      // Extract date from the payload
      const date = payload[0].payload.date;

      // Format the date as needed

      return (
        <div className="custom-tooltip">
          <p>Date: {date}</p>
          <p>Value: {payload[0].value}</p>
        </div>
      );
    }

    return null;
  };
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
            <XAxis tick={{ fill: 'white' }} axisLine={{ stroke: 'white' }} />
            <YAxis
              type="number"
              tick={{ fill: 'white' }}
              axisLine={{ stroke: 'white' }}
            />
            <Tooltip
              content={<CustomTooltip />}
              contentStyle={{
                background: 'white !important',
                color: 'white !important',
              }}
              wrapperStyle={{
                backgroundColor: 'white',
                color: 'red',
                border: '1px solid red',
              }}
            />
            <Legend />
            <Bar dataKey="price" fill="#8b0000" />
          </BarChart>
        </ResponsiveContainer>
        <div className="stock__bull">
          <img className="stock__bullImg" src={bull} alt="bull" />
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
      <button className="stock__singleBtn" onClick={() => setIsOpen(true)}>
        View More
      </button>
    </article>
  );
};

export default SingleStock;
