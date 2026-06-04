import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../apis/auth";
import { setTokens } from "../utils/authStorage";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

    try {
      setIsSubmitting(true);
      const { accessToken, refreshToken } = await signIn(email, password);
      setTokens(accessToken, refreshToken);
      navigate("/");
    } catch (err) {
      const message = axios.isAxiosError(err)
        ? (err.response?.data?.message ?? "로그인에 실패했습니다.")
        : "로그인에 실패했습니다.";
      alert(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4 p-8 bg-gray-900 rounded-lg w-80"
      >
        <h1 className="text-2xl font-bold text-white text-center">로그인</h1>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-3 py-2 rounded bg-gray-800 text-white"
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-3 py-2 rounded bg-gray-800 text-white"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="py-2 bg-[#b2dab1] text-black font-bold rounded hover:bg-[#9bc99a] disabled:opacity-60"
        >
          {isSubmitting ? "로그인 중..." : "로그인"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
