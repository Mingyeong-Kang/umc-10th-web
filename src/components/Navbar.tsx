import { NavLink } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("accessToken"); // ⭐ 바로 읽기

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login"; // ⭐ 강제 리렌더
  };

  return (
    <div className="flex gap-4 p-4 bg-gray-100">
      <NavLink to="/">홈</NavLink>
      <NavLink to="/">인기 영화</NavLink>
      <NavLink to="/">평점 높은</NavLink>

      {!token ? (
        <>
          <NavLink to="/login">로그인</NavLink>
          <NavLink to="/signup">회원가입</NavLink>
        </>
      ) : (
        <>
          <NavLink to="/mypage">MyPage</NavLink>
          <button onClick={handleLogout}>로그아웃</button>
        </>
      )}
    </div>
  );
}