import { Outlet } from 'react-router-dom';
const StocksLayout = () => {
  return (
    <div className="section-center">
      <Outlet />
    </div>
  );
};

export default StocksLayout;
