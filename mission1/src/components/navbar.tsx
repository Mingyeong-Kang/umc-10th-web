import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <Link to="/">홈 페이지</Link>
      <Link to="/movies">영화 목록</Link>
    </nav>
  );
};

export default Navbar;