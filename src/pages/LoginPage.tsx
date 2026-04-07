import useForm from "../hooks/useForm.ts";
import { validateSignin } from "../utils/validate.ts";
import type { UserSigninInformation } from "../utils/validate.ts";
import { postSignin } from "../apis/auth.ts";
import { useLocalStorage } from "../hooks/useLocalStorage.ts";
import { LOCAL_STORAGE_KEY } from "../constants/Key.ts";

const LoginPage = () => {
  const { setItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);

  const { values, errors, touched, getInputProps } =
    useForm<UserSigninInformation>({
      initialValue: {
        email: "",
        password: "",
      },
      validate: validateSignin,
    });

  const handleSubmit = async () => {
    console.log(values);

    try {
      const response = await postSignin(values);
      setItem(response.data.accessToken);
    } catch (error: any) {
      alert(error?.message);
    }
  };

  const isDisabled: boolean =
    Object.values(errors || {}).some((error: string) => error.length > 0) ||
    Object.values(values).some((value: string) => value === "");

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="flex flex-col gap-3">
        <input
          {...getInputProps("email")}
          className={`border w-[300px] p-[10px] rounded-sm focus:border-[#807bff]
          ${
            errors?.email && touched?.email
              ? "border-red-500 bg-red-200"
              : "border-[#ccc]"
          }`}
          type="email"
          placeholder="이메일"
        />

        {errors?.email && touched?.email && (
          <div className="text-red-500 text-sm">{errors.email}</div>
        )}

        <input
          {...getInputProps("password")}
          className={`border w-[300px] p-[10px] rounded-sm focus:border-[#807bff]
          ${
            errors?.password && touched?.password
              ? "border-red-500 bg-red-200"
              : "border-[#ccc]"
          }`}
          type="password"
          placeholder="비밀번호"
        />

        {errors?.password && touched?.password && (
          <div className="text-red-500 text-sm">{errors.password}</div>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isDisabled}
          className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300"
        >
          로그인
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
