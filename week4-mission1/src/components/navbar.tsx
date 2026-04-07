// src/components/Navbar.tsx
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      {/* 왼쪽 메뉴 */}
      <div className="flex gap-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-white px-3 py-1 rounded ${isActive ? "bg-gray-600" : ""}`
          }
        >
          홈
        </NavLink>

        <NavLink
          to="/movies/popular"
          className={({ isActive }) =>
            `text-white px-3 py-1 rounded ${isActive ? "bg-gray-600" : ""}`
          }
        >
          인기 영화
        </NavLink>

        <NavLink
          to="/movies/now-playing"
          className={({ isActive }) =>
            `text-white px-3 py-1 rounded ${isActive ? "bg-gray-600" : ""}`
          }
        >
          현재 상영 중
        </NavLink>

        <NavLink
          to="/movies/upcoming"
          className={({ isActive }) =>
            `text-white px-3 py-1 rounded ${isActive ? "bg-gray-600" : ""}`
          }
        >
          개봉 예정
        </NavLink>

        <NavLink
          to="/movies/top-rated"
          className={({ isActive }) =>
            `text-white px-3 py-1 rounded ${isActive ? "bg-gray-600" : ""}`
          }
        >
          평점 높은
        </NavLink>
      </div>

      {/* 오른쪽 로그인/회원가입 버튼 */}
      <div className="flex gap-3">
        <button
          onClick={() => navigate("/login")}
          className="px-4 py-1 border border-gray-400 rounded text-white hover:bg-gray-700 transition"
        >
          로그인
        </button>
        <button
          onClick={() => navigate("/signup")}
          className="px-4 py-1 bg-pink-500 rounded text-white hover:bg-pink-600 transition"
        >
          회원가입
        </button>
      </div>
    </nav>
  );
};

export default Navbar;