import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="nav">
      <ul className="navbar">
        <li className="list-item">
          <Link className="link" to="/">
            Home
          </Link>
        </li>
        <li className="list-item">
          <Link className="link" to="/admin">
            Admin
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
