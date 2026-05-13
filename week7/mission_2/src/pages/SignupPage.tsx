import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { signUp } from "../apis/auth";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert("모든 필수 항목을 입력해주세요.");
      return;
    }
    try {
      setIsSubmitting(true);
      await signUp({ name, email, password });
      alert("회원가입에 성공했습니다. 로그인해주세요.");
      navigate("/login", { replace: true });
    } catch (err) {
      const message = axios.isAxiosError(err)
        ? (err.response?.data?.message ?? "회원가입에 실패했습니다.")
        : "회원가입에 실패했습니다.";
      alert(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-8 bg-gray-900 rounded-lg w-80"
      >
        <h1 className="text-2xl font-bold text-white text-center">회원가입</h1>
        <input
          type="text"
          placeholder="닉네임"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-3 py-2 rounded bg-gray-800 text-white"
        />
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
          {isSubmitting ? "가입 중..." : "회원가입"}
        </button>
        <p className="text-center text-sm text-gray-400">
          이미 계정이 있나요?{" "}
          <Link to="/login" className="text-[#b2dab1] underline">
            로그인
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;
