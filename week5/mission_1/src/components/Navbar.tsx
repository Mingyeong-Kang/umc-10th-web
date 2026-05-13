import { NavLink, useNavigate } from "react-router-dom";

const LINK = [
  { to: '/', label: '홈' },
  { to: '/movies/popular', label: '인기영화' },
  { to: '/movies/now_playing', label: '상영 중' },
  { to: '/movies/top_rated', label: '평점높은' },
];

export const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  return (
    <div className="flex gap-3 p-4 items-center">
      {LINK.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            isActive ? 'text-[#b2dab1] font-bold' : 'text-gray-500'
          }
        >
          {label}
        </NavLink>
      ))}

      <div className="ml-auto">
        {token ? (
          <button
            onClick={handleLogout}
            className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600"
          >
            로그아웃
          </button>
        ) : (
          <NavLink
            to="/login"
            className="px-3 py-1 bg-[#b2dab1] text-black font-bold rounded"
          >
            로그인
          </NavLink>
        )}
      </div>
    </div>
  );
};
