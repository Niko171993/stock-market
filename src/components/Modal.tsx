import { ModalType } from 'Types/Types';
import { useEffect, useState } from 'react';
import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Bar,
} from 'recharts';
import { CustomTooltipProps } from './SingleStock';
import { Link } from 'react-router-dom';
const Modal = ({
  id,
  isOpen,
  companyName,
  stockName,
  data,
  setIsOpen,
}: ModalType) => {
  const [randomImage, setRandomImage] = useState<string>();
  const modalClassName = `${isOpen ? 'show-modal' : 'hide-modal'}`;

  const getRandomImage = () => {
    const randomNumber = Math.floor(Math.random() * 1000);
    const fullImage = `https://picsum.photos/200/300?random=${randomNumber}`;
    setRandomImage(fullImage);
  };
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
  useEffect(() => {
    getRandomImage();
  }, []);
  return (
    <div className={`modal ${modalClassName}`}>
      <div className="modal__container">
        <div className="modal__content">
          <button className="modal__closeBtn" onClick={() => setIsOpen(false)}>
            X
          </button>
          <img
            className="modal__main-image"
            src={randomImage}
            alt="main-image"
          />
          <div className="modal__chartContainer">
            <div className="modal__chart">
              <ResponsiveContainer width="99%" height="100%">
                <BarChart data={data}>
                  <XAxis />
                  <YAxis dataKey="price" />
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
                  <Bar dataKey="price" fill="red" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="modal__info">
              <div className="flex-2">
                <h5>
                  <span className="modal__subName">CompanyName:</span>{' '}
                  {companyName}
                </h5>{' '}
                <h5>
                  <span className="modal__subName">StockName:</span> {stockName}
                </h5>
              </div>
              <div className="flex-2">
                <h5>
                  <span className="modal__subName">date:</span>{' '}
                  {data[data.length - 1].date}
                </h5>
                <h5>
                  <span className="modal__subName">Previous Price:</span> $
                  {data[data.length - 2].price}
                </h5>
                <h5>
                  <span className="modal__subName">Price:</span> $
                  {data[data.length - 1].price}
                </h5>
              </div>
            </div>
          </div>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic eos
            totam aspernatur laboriosam quo enim reprehenderit quibusdam vitae
            cupiditate soluta facere magnam, corrupti provident minus quam
            tempore illum suscipit maiores eum perspiciatis autem! Aut
            recusandae sint quo error eveniet eius consectetur voluptates, fuga
            quod quia dolores cum ullam quisquam laborum est! Expedita culpa
            inventore vero ducimus. Rerum hic sequi vitae nostrum eius numquam,
            accusamus, voluptatum a itaque nihil, incidunt provident nulla
            inventore omnis sed molestiae
          </div>
          <div className="row justify-end">
            <Link className="btn" to={`/${id}`}>
              View Full Page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
