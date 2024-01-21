import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';
const StocksLayout = () => {
  return (
    <>
      <Navbar />
      <>
        <Outlet />
      </>
    </>
  );
};

export default StocksLayout;
