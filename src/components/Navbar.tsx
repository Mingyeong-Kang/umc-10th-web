import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="flex gap-4 p-4 bg-gray-100">
      <NavLink to="/" className="hover:text-blue-500">
        홈
      </NavLink>
      <NavLink to="/" className="hover:text-blue-500">
        인기 영화
      </NavLink>
      <NavLink to="/" className="hover:text-blue-500">
        평점 높은
      </NavLink>
      <NavLink to="/login">로그인</NavLink>
      <NavLink to="/signup">회원가입</NavLink> 
    </div>
  );
}