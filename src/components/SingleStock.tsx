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
const SingleStock = ({
  id,
  companyName,
  stockName,

  data,
}: SingleStockType) => {
  return (
    <article className="stock">
      <div className="stock__img">
        <h3>{stockName} Chart</h3>
        <ResponsiveContainer width="99%" height="100%" className="bar">
          <BarChart width={500} height={300} data={data}>
            <XAxis dataKey="date" />
            <YAxis type="number" />
            <Tooltip
              contentStyle={{
                background: 'white !important',
                color: 'black !important',
              }}
            />
            <Legend />
            <Bar dataKey="price" fill="red" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="bull">
        <img className="bull-img" src={bull} alt="bull" />
      </div>
      <div className="stock__info">
        <div className="flex">
          <h5>Company Name</h5>
          <h3>{companyName}</h3>
        </div>
        <div className="flex">
          <h5>Stock Name</h5>
          <p>{stockName}</p>
        </div>
        <div className="flex">
          <h5>Current Price</h5>
          <p>{data[data.length - 1].price}</p>
        </div>
      </div>
    </article>
  );
};

export default SingleStock;
