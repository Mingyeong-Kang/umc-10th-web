import { useState } from "react";
import { postSignup } from "../apis/auth";

// 이메일 검증 함수
const validateEmail = (email: string) => {
  return /\S+@\S+\.\S+/.test(email);
};

const SignupPage = () => {
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");

  const [name, setName] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleEmailNext = () => {
    if (!validateEmail(email)) {
      setEmailError("올바른 이메일 형식을 입력해주세요.");
      return;
    }
    setEmailError("");
    setStep(2);
  };

  const handlePasswordNext = () => {
    if (password.length < 6) {
      setPasswordError("비밀번호는 6자 이상이어야 합니다.");
      return;
    }
    setPasswordError("");

    if (password !== passwordConfirm) {
      setConfirmError("비밀번호가 일치하지 않습니다.");
      return;
    }
    setConfirmError("");

    setStep(3);
  };

  const handleSignup = async () => {
    try {
      await postSignup({
        email,
        password,
        name,
      });

      alert("회원가입 성공!");
      window.location.href = "/";
    } catch (error: any) {
      alert(error?.message || "회원가입 실패");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      {/* STEP 1 */}
      {step === 1 && (
        <>
          <h1 className="text-xl font-bold">이메일 입력</h1>

          <input
            className="border p-2 w-[300px]"
            type="text"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {emailError && <p className="text-red-500 text-sm">{emailError}</p>}

          <button
            onClick={handleEmailNext}
            disabled={!email}
            className="bg-blue-500 text-white px-4 py-2 disabled:bg-gray-300"
          >
            다음
          </button>
        </>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <>
          <h1 className="text-xl font-bold">비밀번호 설정</h1>

          <p className="text-sm text-gray-500">{email}</p>

          <div className="relative">
            <input
              className="border p-2 w-[300px]"
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              className="absolute right-2 top-2"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              👁
            </button>
          </div>

          {passwordError && (
            <p className="text-red-500 text-sm">{passwordError}</p>
          )}

          <input
            className="border p-2 w-[300px]"
            type="password"
            placeholder="비밀번호 확인"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />

          {confirmError && (
            <p className="text-red-500 text-sm">{confirmError}</p>
          )}

          <button
            onClick={handlePasswordNext}
            disabled={!password || !passwordConfirm}
            className="bg-blue-500 text-white px-4 py-2 disabled:bg-gray-300"
          >
            다음
          </button>
        </>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <>
          <h1 className="text-xl font-bold">닉네임 설정</h1>

          {/* 프로필 UI (dummy) */}
          <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center">
            +
          </div>

          <input
            className="border p-2 w-[300px]"
            type="text"
            placeholder="닉네임"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button
            onClick={handleSignup}
            disabled={!name}
            className="bg-green-500 text-white px-4 py-2 disabled:bg-gray-300"
          >
            회원가입 완료
          </button>
        </>
      )}
    </div>
  );
};

export default SignupPage;
