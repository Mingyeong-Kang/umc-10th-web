import { useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";

interface LoginFormValues {
  email: string;
  password: string;
}

const validate = (values: LoginFormValues) => {
  const errors = {} as Record<keyof LoginFormValues, string>;

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "유효하지 않은 이메일 형식입니다.";
  } else {
    errors.email = "";
  }

  if (values.password.length < 6) {
    errors.password = "비밀번호는 최소 6자 이상이어야 합니다.";
  } else {
    errors.password = "";
  }

  return errors;
};

const LoginPage = () => {
  const navigate = useNavigate();
  const { values, errors, touched, getInputProps } = useForm<LoginFormValues>({
    initialValues: { email: "", password: "" },
    validate,
  });

  const isValid = !errors.email && !errors.password && values.email !== "" && values.password !== "";

  const handleSubmit = () => {
    if (isValid) {
      console.log("로그인 시도:", values);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-[380px]">
        {/* 뒤로 가기 버튼 */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-gray-400 hover:text-gray-700 text-xl cursor-pointer mb-4 transition-colors"
        >
          &larr; 뒤로
        </button>

        {/* 타이틀 */}
        <h1 className="text-2xl font-bold text-gray-800 mb-1">로그인</h1>
        <p className="text-sm text-gray-500 mb-6">계정에 로그인하여 서비스를 이용하세요</p>

        {/* 구글 로그인 버튼 */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 px-4 text-gray-700 font-medium hover:bg-gray-50 hover:shadow-sm transition-all cursor-pointer mb-6"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Google로 로그인
        </button>

        {/* 구분선 */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">또는 이메일로 로그인</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* 로그인 폼 */}
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">이메일</label>
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

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">비밀번호</label>
            <input
              {...getInputProps("password")}
              className={`border w-full p-3 rounded-lg outline-none transition-colors ${
                touched.password && errors.password
                  ? "border-red-400 bg-red-50 focus:border-red-500"
                  : "border-gray-200 bg-gray-50 focus:border-blue-500 focus:bg-white"
              }`}
              type="password"
              placeholder="비밀번호를 입력해주세요"
            />
            {touched.password && errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isValid}
            className="w-full bg-blue-600 text-white py-3 rounded-lg text-base font-semibold hover:bg-blue-700 active:scale-[0.98] transition-all cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed mt-1"
          >
            로그인
          </button>
        </div>

        {/* 하단 링크 */}
        <p className="text-center text-sm text-gray-500 mt-6">
          계정이 없으신가요?{" "}
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="text-blue-600 font-medium hover:underline cursor-pointer"
          >
            회원가입
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
