import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ display: 'flex', gap: '15px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/profile/user123">Profile (User 123)</NavLink>
      <NavLink to="/dashboard">Dashboard (Protected)</NavLink>
    </nav>
  );
};

export default Navbar;
