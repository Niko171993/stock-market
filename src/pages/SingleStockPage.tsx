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
import { useEffect, useState } from 'react';
import { MainSettingsType } from '../Types/Types';
const SingleStockPage = () => {
  const { id: PAGEID } = useParams();
  const { simulatedStocks, isLoading } = useSimulatedContext();
  const [innerWidth, setInnerWidth] = useState<number>(0);
  const [mainSettings, setMainSettings] = useState<MainSettingsType | {}>();
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
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 560,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const oldPrice = data[data.length - 1].price;
  const newPrice = data[data.length - 2].price;
  const dataHistory = data.map((item) => {
    const { date, price } = item;
    return (
      <article key={date} className="singleStockPage__history-data">
        <div className="singleStockPage__single-data">
          <p className="el">
            <span>Time :</span> <span>{date}</span>
          </p>
          <p className="el">
            <span>Price :</span> <span>{price}</span>
          </p>
        </div>
        <div className="dataHistory__line"></div>
      </article>
    );
  });
  return (
    <section className="singleStockPage">
      <div className="center">
        <h1>Day Trade</h1>
        <article className="singleStockPage__slides">
          <Slider {...settings}>{pageSlides}</Slider>
        </article>
        <article className="singleStockPage__chart-container">
          <div className="singleStockPage__prices">
            <div className="singleStockPage__pricebox">
              <p>Old Price: ${oldPrice}</p>
            </div>
            <div className="singleStockPage__pricebox">
              <p>New Price: ${newPrice}</p>
            </div>
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
        </article>
        <article className="singleStockPage__history">
          <h4>Data History </h4>
          <div className="dataHistory__container">{dataHistory}</div>
        </article>
      </div>
      <Link to=".." className="btn">
        Back Home
      </Link>
    </section>
  );
};

export default SingleStockPage;
