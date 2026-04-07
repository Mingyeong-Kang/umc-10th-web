import { useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const { values, errors, handleChange } = useForm();

  // ✅ 버튼 활성 조건
  const isFormValid =
    values.email && values.password && !errors.email && !errors.password;

  const handleLogin = async () => {
    if (!isFormValid) return;

    try {
      const res = await axios.post("http://localhost:3000/auth/login", {
        email: values.email,
        password: values.password,
      });

      localStorage.setItem("accessToken", res.data.accessToken);
      navigate("/");
    } catch (err) {
      alert("로그인 실패");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white px-4">
      
      {/* 뒤로가기 */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 text-xl text-gray-300"
      >
        &lt;
      </button>

      <div className="w-full max-w-sm">
        {/* 타이틀 */}
        <h1 className="text-2xl font-bold mb-6 text-center">로그인</h1>

        {/* 구글 로그인 버튼 */}
        <button className="w-full flex items-center justify-center gap-3 border border-gray-500 rounded-md py-3 mb-4 hover:bg-gray-800 transition">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            className="w-5 h-5"
          />
          <span className="text-white">구글 로그인</span>
        </button>

        {/* OR 구분선 */}
        <div className="flex items-center my-4">
          <div className="flex-1 h-px bg-gray-600" />
          <span className="px-3 text-sm text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-600" />
        </div>

        {/* 이메일 */}
        <input
          type="email"
          name="email"
          placeholder="이메일을 입력해주세요!"
          value={values.email || ""}
          onChange={handleChange}
          className={`w-full p-3 mb-2 rounded-md bg-transparent border placeholder-gray-400 focus:outline-none ${
            errors.email
              ? "border-pink-500 bg-pink-200 text-black placeholder-black"
              : "border-gray-600 bg-transparent text-white focus:border-pink-500"
          }`}
        />
        {errors.email && (
          <p className="text-pink-500 text-sm mb-2">{errors.email}</p>
        )}

        {/* 비밀번호 */}
        <input
          type="password"
          name="password"
          placeholder="비밀번호를 입력해주세요!"
          value={values.password || ""}
          onChange={handleChange}
          className={`w-full p-3 mb-3 rounded-md bg-transparent border placeholder-gray-400 focus:outline-none ${
            errors.password
              ? "border-pink-500 bg-pink-200 text-black placeholder-black"
              : "border-gray-600 bg-transparent text-white focus:border-pink-500"
          }`}
        />
        {errors.password && (
          <p className="text-pink-500 text-sm mb-3">{errors.password}</p>
        )}

        {/* 로그인 버튼 */}
        <button
          onClick={handleLogin}
          disabled={!isFormValid}
          className={`w-full py-3 rounded-md font-semibold transition ${
            isFormValid
              ? "bg-pink-500 hover:bg-pink-600 text-white"
              : "bg-gray-700 text-gray-400 cursor-not-allowed"
          }`}
        >
          로그인
        </button>
      </div>
    </div>
  );
};

export default LoginPage;