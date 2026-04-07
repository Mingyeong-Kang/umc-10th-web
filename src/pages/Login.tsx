import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:3000/v1/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "로그인 실패");
        return;
      }

      // 🔥 토큰 저장
      localStorage.setItem("accessToken", data.accessToken);

      alert("로그인 성공!");
      console.log("토큰:", data.accessToken);
    } catch (err) {
      alert("서버 오류");
    }
  };

  return (
    <div className="flex flex-col items-center mt-20 gap-4 text-white">
      <h1 className="text-xl">로그인</h1>

      <input
        placeholder="이메일"
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 text-black"
      />

      <input
        type="password"
        placeholder="비밀번호"
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 text-black"
      />

      <button
        onClick={handleLogin}
        className="bg-pink-500 px-4 py-2"
      >
        로그인
      </button>
    </div>
  );
}