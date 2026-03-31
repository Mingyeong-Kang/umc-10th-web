// src/components/Navbar.tsx
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 flex gap-4">
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
    </nav>
  );
};

export default Navbar;