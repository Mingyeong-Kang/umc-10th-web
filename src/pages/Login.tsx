import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      alert("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    // mock 로그인
    localStorage.setItem("accessToken", "mock-access-token");
    localStorage.setItem("refreshToken", "mock-refresh-token");
    localStorage.setItem("nickname", "연진님");

    alert("로그인 성공");
    navigate(from, { replace: true });
    window.location.reload();
  };

  const handleGoogleLogin = () => {
    localStorage.setItem("accessToken", "mock-google-access-token");
    localStorage.setItem("refreshToken", "mock-google-refresh-token");
    localStorage.setItem("nickname", "연진님");

    alert("구글 로그인 성공");
    navigate(from, { replace: true });
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 text-black">
      <h1 className="text-3xl font-bold">로그인</h1>

      <button
        onClick={handleGoogleLogin}
        className="border p-2 w-64"
      >
        구글 로그인
      </button>

      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-64"
      />

      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 w-64"
      />

      <button
        onClick={handleLogin}
        className="bg-pink-500 text-white px-4 py-2 w-64"
      >
        로그인
      </button>
    </div>
  );
}