import { ModalType } from 'Types/Types';
import { useEffect, useState } from 'react';
import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  Bar,
} from 'recharts';
const Modal = ({
  isOpen,
  companyName,
  stockName,
  data,
  setIsOpen,
  gucci,
}: ModalType) => {
  const [randomImage, setRandomImage] = useState<string>();
  const modalClassName = `${isOpen ? 'show-modal' : 'hide-modal'}`;

  const getRandomImage = () => {
    const randomNumber = Math.floor(Math.random() * 1000);
    const fullImage = `https://picsum.photos/200/300?random=${randomNumber}`;
    setRandomImage(fullImage);
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
          <img className="gucci" src={randomImage} alt="gucci mane" />
          <div className="modal__chartContainer">
            <div className="modal__chart">
              <ResponsiveContainer width="99%" height="100%">
                <BarChart data={data}>
                  <XAxis dataKey="date" />
                  <YAxis dataKey="price" />
                  <Tooltip />
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
          <div></div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic eos totam
          aspernatur laboriosam quo enim reprehenderit quibusdam vitae
          cupiditate soluta facere magnam, corrupti provident minus quam tempore
          illum suscipit maiores eum perspiciatis autem! Aut recusandae sint quo
          error eveniet eius consectetur voluptates, fuga quod quia dolores cum
          ullam quisquam laborum est! Expedita culpa inventore vero ducimus.
          Rerum hic sequi vitae nostrum eius numquam, accusamus, voluptatum a
          itaque nihil, incidunt provident nulla inventore omnis sed molestiae
        </div>
      </div>
    </div>
  );
};

export default Modal;
