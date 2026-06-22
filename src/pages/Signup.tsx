import { useState } from "react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // 🔥 추가

  const handleSignup = async () => {
    try {
      const res = await fetch("http://localhost:3000/v1/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          name, // 🔥 추가
        }),
      });

      const data = await res.json();

      console.log(data); // 🔥 디버깅용

      if (!res.ok) {
        alert(data.message || "회원가입 실패");
        return;
      }

      alert("회원가입 성공!");
    } catch (err) {
      console.log(err);
      alert("서버 오류");
    }
  };

  return (
    <div className="flex flex-col items-center mt-20 gap-4 text-white">
      <h1 className="text-xl">회원가입</h1>

      <input
        placeholder="이메일"
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 text-black"
      />

      <input
        placeholder="닉네임"
        onChange={(e) => setName(e.target.value)}
        className="border p-2 text-black"
      />

      <input
        type="password"
        placeholder="비밀번호"
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 text-black"
      />

      <button
        onClick={handleSignup}
        className="bg-pink-500 px-4 py-2"
      >
        회원가입
      </button>
    </div>
  );
}