import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";

interface SignupFormValues {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
}

const validate = (values: SignupFormValues) => {
  const errors = {} as Record<keyof SignupFormValues, string>;

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "올바른 이메일 형식을 입력해주세요.";
  } else {
    errors.email = "";
  }

  if (values.password.length < 6) {
    errors.password = "비밀번호는 6자 이상이어야 합니다.";
  } else {
    errors.password = "";
  }

  if (values.password !== values.passwordConfirm) {
    errors.passwordConfirm = "비밀번호가 일치하지 않습니다.";
  } else {
    errors.passwordConfirm = "";
  }

  if (values.nickname.trim() === "") {
    errors.nickname = "닉네임을 입력해주세요.";
  } else {
    errors.nickname = "";
  }

  return errors;
};

const SignupPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const { values, errors, touched, getInputProps } = useForm<SignupFormValues>({
    initialValues: { email: "", password: "", passwordConfirm: "", nickname: "" },
    validate,
  });

  const isEmailValid = !errors.email && values.email !== "";
  const isPasswordValid =
    !errors.password &&
    !errors.passwordConfirm &&
    values.password !== "" &&
    values.passwordConfirm !== "";
  const isNicknameValid = !errors.nickname && values.nickname.trim() !== "";

  const handleNext = () => {
    if (step === 1 && isEmailValid) {
      setStep(2);
    } else if (step === 2 && isPasswordValid) {
      setStep(3);
    }
  };

  const handleSignup = () => {
    if (isNicknameValid) {
      console.log("회원가입 완료:", {
        email: values.email,
        password: values.password,
        nickname: values.nickname,
      });
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-[380px]">
        {/* 뒤로 가기 버튼 */}
        <button
          type="button"
          onClick={() => (step > 1 ? setStep(step - 1) : navigate(-1))}
          className="text-gray-400 hover:text-gray-700 text-xl cursor-pointer mb-4 transition-colors"
        >
          &larr; 뒤로
        </button>

        {/* 타이틀 */}
        <h1 className="text-2xl font-bold text-gray-800 mb-1">회원가입</h1>
        <p className="text-sm text-gray-500 mb-6">
          {step === 1 && "이메일을 입력해주세요"}
          {step === 2 && "비밀번호를 설정해주세요"}
          {step === 3 && "닉네임을 설정해주세요"}
        </p>

        {/* 스텝 인디케이터 */}
        <div className="flex gap-2 mb-6">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`flex-1 h-1 rounded-full transition-colors ${
                s <= step ? "bg-blue-600" : "bg-gray-200"
              }`}
            />
          ))}
        </div>

        {/* Step 1: 이메일 입력 */}
        {step === 1 && (
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                이메일
              </label>
              <input
                {...getInputProps("email")}
                className={`border w-full p-3 rounded-lg outline-none transition-colors ${
                  touched.email && errors.email
                    ? "border-red-400 bg-red-50 focus:border-red-500"
                    : "border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white"
                }`}
                type="email"
                placeholder="example@email.com"
              />
              {touched.email && errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <button
              type="button"
              onClick={handleNext}
              disabled={!isEmailValid}
              className="w-full bg-blue-600 text-white py-3 rounded-lg text-base font-semibold hover:bg-blue-700 active:scale-[0.98] transition-all cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed mt-1"
            >
              다음
            </button>
          </div>
        )}

        {/* Step 2: 비밀번호 설정 */}
        {step === 2 && (
          <div className="flex flex-col gap-4">
            {/* 이전 이메일 표시 */}
            <div className="bg-gray-50 rounded-lg px-4 py-3 border border-gray-200">
              <p className="text-xs text-gray-400 mb-0.5">이메일</p>
              <p className="text-sm text-gray-700">{values.email}</p>
            </div>

            {/* 비밀번호 */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                비밀번호
              </label>
              <div className="relative">
                <input
                  {...getInputProps("password")}
                  className={`border w-full p-3 pr-12 rounded-lg outline-none transition-colors ${
                    touched.password && errors.password
                      ? "border-red-400 bg-red-50 focus:border-red-500"
                      : "border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white"
                  }`}
                  type={showPassword ? "text" : "password"}
                  placeholder="6자 이상 입력해주세요"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  )}
                </button>
              </div>
              {touched.password && errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* 비밀번호 확인 */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                비밀번호 확인
              </label>
              <div className="relative">
                <input
                  {...getInputProps("passwordConfirm")}
                  className={`border w-full p-3 pr-12 rounded-lg outline-none transition-colors ${
                    touched.passwordConfirm && errors.passwordConfirm
                      ? "border-red-400 bg-red-50 focus:border-red-500"
                      : "border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white"
                  }`}
                  type={showPasswordConfirm ? "text" : "password"}
                  placeholder="비밀번호를 다시 입력해주세요"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {showPasswordConfirm ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  )}
                </button>
              </div>
              {touched.passwordConfirm && errors.passwordConfirm && (
                <p className="text-red-500 text-xs mt-1">{errors.passwordConfirm}</p>
              )}
            </div>

            <button
              type="button"
              onClick={handleNext}
              disabled={!isPasswordValid}
              className="w-full bg-blue-600 text-white py-3 rounded-lg text-base font-semibold hover:bg-blue-700 active:scale-[0.98] transition-all cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed mt-1"
            >
              다음
            </button>
          </div>
        )}

        {/* Step 3: 닉네임 설정 */}
        {step === 3 && (
          <div className="flex flex-col gap-4">
            {/* 이전 정보 표시 */}
            <div className="bg-gray-50 rounded-lg px-4 py-3 border border-gray-200">
              <p className="text-xs text-gray-400 mb-0.5">이메일</p>
              <p className="text-sm text-gray-700">{values.email}</p>
            </div>

            {/* 프로필 이미지 UI (선택) */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <button
                type="button"
                className="text-xs text-blue-600 hover:underline cursor-pointer"
              >
                프로필 이미지 변경
              </button>
            </div>

            {/* 닉네임 */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                닉네임
              </label>
              <input
                {...getInputProps("nickname")}
                className={`border w-full p-3 rounded-lg outline-none transition-colors ${
                  touched.nickname && errors.nickname
                    ? "border-red-400 bg-red-50 focus:border-red-500"
                    : "border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white"
                }`}
                type="text"
                placeholder="닉네임을 입력해주세요"
              />
              {touched.nickname && errors.nickname && (
                <p className="text-red-500 text-xs mt-1">{errors.nickname}</p>
              )}
            </div>

            <button
              type="button"
              onClick={handleSignup}
              disabled={!isNicknameValid}
              className="w-full bg-blue-600 text-white py-3 rounded-lg text-base font-semibold hover:bg-blue-700 active:scale-[0.98] transition-all cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed mt-1"
            >
              회원가입 완료
            </button>
          </div>
        )}

        {/* 하단 링크 */}
        <p className="text-center text-sm text-gray-500 mt-6">
          이미 계정이 있으신가요?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-blue-600 font-medium hover:underline cursor-pointer"
          >
            로그인
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
