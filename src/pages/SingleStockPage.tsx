import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useParams } from 'react-router-dom';
import { useSimulatedContext } from '../contexts/StockAPIContext';
import { CustomTooltipProps } from '../components/SingleStock';
import { Link } from 'react-router-dom';
const SingleStockPage = () => {
  const { id } = useParams();
  const { simulatedStocks } = useSimulatedContext();

  const singleStock = simulatedStocks.find((stock) => stock.id === Number(id))!;
  const { data } = singleStock;

  return (
    <section className="singleStockPage">
      <div className="center">
        <div className="singleStockPage__lineChart">
          <ResponsiveContainer width="99%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="price" />
              <YAxis />

              <Legend />
              <Line dataKey="price" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <Link to=".." className="btn">
        Back Home
      </Link>
    </section>
  );
};

export default SingleStockPage;
