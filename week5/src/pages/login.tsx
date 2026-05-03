import { useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FcGoogle } from "react-icons/fc";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const schema = z.object({
  email: z.string().email("유효하지 않은 이메일 형식입니다."),
  password: z.string().min(6, "비밀번호는 최소 6자 이상이어야 합니다."),
});

type LoginForm = z.infer<typeof schema>;

const LoginPage = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginForm>({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    try {
      await auth?.login(data);
      alert("로그인 성공!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("로그인 실패");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8000/v1/auth/google/login";
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-xs">

        <div className="flex items-center mb-6">
          <button onClick={() => navigate(-1)} className="text-white text-xl mr-4">
            &lt;
          </button>
          <h1 className="text-white text-lg font-semibold">로그인</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-3 w-full p-3 mb-4 border border-gray-600 rounded-md hover:bg-gray-800 transition text-white"
          >
            <FcGoogle size={20} />
            구글 로그인
          </button>

          <div className="flex items-center text-gray-500 mb-4">
            <hr className="flex-grow border-gray-600" />
            <span className="mx-3 text-sm">OR</span>
            <hr className="flex-grow border-gray-600" />
          </div>

          <input
            {...register("email")}
            type="email"
            placeholder="이메일을 입력해주세요!"
            className={`w-full p-3 mb-1 rounded-md border bg-transparent placeholder-gray-500 text-white ${
              errors.email
                ? "border-pink-500 bg-pink-950"
                : "border-gray-600"
            }`}
          />
          {errors.email && (
            <p className="text-pink-500 text-sm mb-2">{errors.email.message}</p>
          )}

          <input
            {...register("password")}
            type="password"
            placeholder="비밀번호를 입력해주세요!"
            className={`w-full p-3 mb-1 rounded-md border bg-transparent placeholder-gray-500 text-white ${
              errors.password
                ? "border-pink-500 bg-pink-950"
                : "border-gray-600"
            }`}
          />
          {errors.password && (
            <p className="text-pink-500 text-sm mb-3">{errors.password.message}</p>
          )}

          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className={`w-full py-3 rounded-md font-semibold transition mt-1 ${
              isValid
                ? "bg-pink-500 hover:bg-pink-600 text-white"
                : "bg-gray-800 text-gray-500 cursor-not-allowed"
            }`}
          >
            로그인
          </button>

        </form>
      </div>
    </div>
  );
};

export default LoginPage;