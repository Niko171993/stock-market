import React from 'react';
import { ModalType } from 'Types/Types';
import { useEffect } from 'react';
const Modal = ({
  isOpen,
  companyName,
  stockName,
  data,
  setIsOpen,
  gucci,
}: ModalType) => {
  const modalClassName = `${isOpen ? 'show-modal' : 'hide-modal'}`;
  useEffect(() => {});

  return (
    <div className={`modal ${modalClassName}`}>
      <div className="modal-container">
        <div className="modal-content">
          <button className="modal-close-btn" onClick={() => setIsOpen(false)}>
            X
          </button>
          <img className="gucci" src={gucci} alt="gucci mane" />
          <div>
            <div className="flex-2">
              <h5>CompanyName: {companyName}</h5>{' '}
              <h5>StockName: {stockName}</h5>
            </div>
            <div className="flex-2">
              <h5>date: {data[data.length - 1].date}</h5>
              <h5>Price: ${data[data.length - 1].price}</h5>
            </div>
          </div>
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
