import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineMail } from "react-icons/ai";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { postSignup } from "../apis/auth";
import type { RequestSignupDto, ResponseSignupDto } from "../types/auth";

const schema = z
  .object({
    name: z.string().min(2, "닉네임은 2자 이상이어야 합니다."),
    email: z.string().email("올바른 이메일 형식을 입력해주세요."),
    password: z.string().min(6, "비밀번호는 6자 이상이어야 합니다."),
    passwordCheck: z.string(),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
  });

type FormFields = z.infer<typeof schema>;

const SignupPage = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState<"email" | "password" | "nickname">("email");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
    },
  });

  const nextEmailStep = async () => {
    const valid = await trigger("email");
    if (valid) setStep("password");
  };

  const nextPasswordStep = async () => {
    const valid = await trigger(["password", "passwordCheck"]);
    if (valid) setStep("nickname");
  };

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const { passwordCheck, ...rest } = data;

    try {
      const response: ResponseSignupDto = await postSignup(rest as RequestSignupDto);
      console.log(response);

      alert("회원가입 성공!");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("회원가입 실패");
    }
  };

  const handleBack = () => {
    if (step === "password") setStep("email");
    else if (step === "nickname") setStep("password");
    else navigate(-1);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 text-white">
      <div className="w-full max-w-xs">

        {/* 상단 */}
        <div className="flex items-center mb-6">
          <button onClick={handleBack} className="text-white text-xl mr-4">
            &lt;
          </button>
          <h1 className="text-lg font-semibold">회원가입</h1>
        </div>

        {/* 이메일 표시 */}
        {(step === "password" || step === "nickname") && (
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
            <AiOutlineMail size={16} />
            <span>{getValues("email")}</span>
          </div>
        )}

        {/* STEP1 이메일 */}
        {step === "email" && (
          <div>
            <button
              type="button"
              className="flex items-center justify-center gap-3 w-full p-3 mb-4 border border-gray-600 rounded-md hover:bg-gray-800"
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
              placeholder="이메일을 입력해주세요!"
              className={`w-full p-3 mb-1 rounded-md border bg-transparent placeholder-gray-500 ${
                errors.email ? "border-pink-500 bg-pink-950" : "border-gray-600"
              }`}
            />
            {errors.email && (
              <p className="text-pink-500 text-sm mb-2">{errors.email.message}</p>
            )}

            <button
              type="button"
              onClick={nextEmailStep}
              className="w-full py-3 rounded-md bg-pink-500 mt-2"
            >
              다음
            </button>
          </div>
        )}

        {/* STEP2 비밀번호 */}
        {step === "password" && (
          <div>
            <div className="relative mb-1">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                placeholder="비밀번호를 입력해주세요!"
                className={`w-full p-3 pr-10 rounded-md border bg-transparent placeholder-gray-500 ${
                  errors.password ? "border-pink-500 bg-pink-950" : "border-gray-600"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-3.5"
              >
                {showPassword ? <HiOutlineEyeOff size={20} /> : <HiOutlineEye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-pink-500 text-sm mb-2">{errors.password.message}</p>
            )}

            <div className="relative mb-1">
              <input
                type={showPasswordCheck ? "text" : "password"}
                {...register("passwordCheck")}
                placeholder="비밀번호를 다시 입력해주세요!"
                className={`w-full p-3 pr-10 rounded-md border bg-transparent placeholder-gray-500 ${
                  errors.passwordCheck ? "border-pink-500 bg-pink-950" : "border-gray-600"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPasswordCheck((prev) => !prev)}
                className="absolute right-3 top-3.5"
              >
                {showPasswordCheck ? <HiOutlineEyeOff size={20} /> : <HiOutlineEye size={20} />}
              </button>
            </div>
            {errors.passwordCheck && (
              <p className="text-pink-500 text-sm mb-2">{errors.passwordCheck.message}</p>
            )}

            <button
              type="button"
              onClick={nextPasswordStep}
              className="w-full py-3 rounded-md bg-pink-500 mt-2"
            >
              다음
            </button>
          </div>
        )}

        {/* STEP3 닉네임 */}
        {step === "nickname" && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-center mb-6">
              <div className="w-32 h-32 rounded-full bg-gray-600 overflow-hidden flex items-center justify-center">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png"
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <input
              {...register("name")}
              placeholder="닉네임을 입력해주세요."
              className={`w-full p-3 mb-1 rounded-md border bg-transparent placeholder-gray-500 ${
                errors.name ? "border-pink-500 bg-pink-950" : "border-gray-600"
              }`}
            />
            {errors.name && (
              <p className="text-pink-500 text-sm mb-2">{errors.name.message}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-md bg-pink-500 mt-2"
            >
              회원가입 완료
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignupPage;