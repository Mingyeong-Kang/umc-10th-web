import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getMe } from "../api/user";
import { googleLoginMutation, loginMutation } from "../api/mutations";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const from = (location.state as any)?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = useMutation({
    mutationFn: loginMutation,
    onSuccess: async () => {
      const me = await getMe();
      queryClient.setQueryData(["me"], me);
      alert("로그인 성공");
      navigate(from, { replace: true });
    },
    onError: (error: Error) => {
      alert(error.message || "로그인 실패");
    },
  });

  const googleLogin = useMutation({
    mutationFn: googleLoginMutation,
    onSuccess: async () => {
      const me = await getMe();
      queryClient.setQueryData(["me"], me);
      alert("구글 로그인 성공");
      navigate(from, { replace: true });
    },
  });

  const handleLogin = () => {
    login.mutate({ email, password });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 text-black">
      <h1 className="text-3xl font-bold">로그인</h1>

      <button
        onClick={() => googleLogin.mutate()}
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
        disabled={login.isPending}
      >
        {login.isPending ? "로그인 중..." : "로그인"}
      </button>
    </div>
  );
}