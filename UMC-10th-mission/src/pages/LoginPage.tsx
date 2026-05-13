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
  }

  if (values.password.length < 6) {
    errors.password = "비밀번호는 최소 6자 이상이어야 합니다.";
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
    <div className="flex flex-col h-full">
      <div className="p-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-2xl cursor-pointer"
        >
          &lt;
        </button>
      </div>

      <div className="flex flex-col items-center justify-center flex-1 gap-4">
        <div className="flex flex-col gap-3">
          <input
            {...getInputProps("email")}
            className="border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm"
            type="email"
            placeholder="이메일을 입력해주세요"
          />
          {touched.email && errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}

          <input
            {...getInputProps("password")}
            className="border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm"
            type="password"
            placeholder="비밀번호를 입력해주세요"
          />
          {touched.password && errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isValid}
            className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300"
          >
            로그인
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;