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
const SingleStock = ({ companyName, stockName, data }: SingleStockType) => {
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
            <Bar dataKey="price" fill="#8b0000" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="bull">
        <img className="bull-img" src={bull} alt="bull" />
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
      <button>View More</button>
    </article>
  );
};

export default SingleStock;
