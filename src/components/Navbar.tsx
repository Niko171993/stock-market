import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="nav">
      <ul className="navbar">
        <li className="navbar__list-item">
          <Link className="navbar__link" to="/">
            Home
          </Link>
        </li>
        <li className="navbar__list-item">
          <Link className="navbar__link" to="/admin">
            Admin
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
