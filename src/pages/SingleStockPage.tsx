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
import Slider from 'react-slick';

const SingleStockPage = () => {
  const { id: PAGEID } = useParams();
  const { simulatedStocks, isLoading } = useSimulatedContext();

  const singleStock = simulatedStocks.find(
    (stock) => stock.id === Number(PAGEID)
  )!;
  const { data } = singleStock || {};
  const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      const date = payload[0].payload.date;

      return (
        <div className="custom-tooltip">
          <p>Date: {date}</p>
          <p>Value: {payload[0].value}</p>
        </div>
      );
    }

    return null;
  };
  const pageSlides = simulatedStocks.map((stock) => {
    const {
      id,
      companyName,
      stockName,
      data: { date, price },
    } = stock;
    const goldBackground = Number(PAGEID) === id;
    return (
      <Link
        to={`/${id}`}
        key={id}
        className={`pageSlide ${goldBackground && 'pageSlide__gold'}`}
      >
        <div className="pageSlide__id">
          <span>id:</span> <span>{id}</span>
        </div>
        <div className="pageSlide__company">
          <span>Company Name: </span>
          <span>{companyName}</span>
        </div>
        <div className="pageSlide__stockName">
          <span>Stock Name: </span>
          <span>{stockName}</span>
        </div>
        <div className="pageSlide__data">
          <div className="pageSlide__date">
            <span>Time: </span>
            <span>{data[data.length - 1].date}</span>
          </div>
          <div className="pageSlide__prices">
            <div className="pageSlide__oldPrice">
              <span>Previous Price: </span>
              <span>${data[data.length - 2].price}</span>
            </div>
            <div className="pageSlide__currentPrice">
              <span>current Price: </span>
              <span>${data[data.length - 1].price}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  });
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
  };
  return (
    <section className="singleStockPage">
      <div className="center">
        <div className="singleStockPage__slides">
          <Slider {...settings}>{pageSlides}</Slider>
        </div>
        <div className="singleStockPage__lineChart">
          <ResponsiveContainer width="99%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis />
              <YAxis />
              <Tooltip
                content={<CustomTooltip />}
                contentStyle={{
                  background: 'white !important',
                  color: 'white !important',
                }}
                wrapperStyle={{
                  backgroundColor: 'white',
                  color: 'red',
                }}
              />
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
