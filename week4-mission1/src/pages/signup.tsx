import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineMail } from "react-icons/ai";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import axios from "axios";
import useLocalStorage from "../hooks/useLocalStorage";

const emailSchema = z.object({
  email: z.email("올바른 이메일 형식을 입력해주세요."),
});

const passwordSchema = z
  .object({
    password: z.string().min(6, "비밀번호는 6자 이상이어야 합니다."),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordConfirm"],
  });

const nicknameSchema = z.object({
  nickname: z.string().min(2, "닉네임은 2자 이상이어야 합니다."),
});

type EmailForm = z.infer<typeof emailSchema>;
type PasswordForm = z.infer<typeof passwordSchema>;
type NicknameForm = z.infer<typeof nicknameSchema>;

const SignUp = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"email" | "password" | "nickname">("email");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const { setValue: setAccessToken } = useLocalStorage("accessToken", "");
  const { setValue: setRefreshToken } = useLocalStorage("refreshToken", "");

  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors: emailErrors, isValid: isEmailValid },
  } = useForm<EmailForm>({
    mode: "onChange",
    resolver: zodResolver(emailSchema),
  });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors, isValid: isPasswordValid },
  } = useForm<PasswordForm>({
    mode: "onChange",
    resolver: zodResolver(passwordSchema),
  });

  const {
    register: registerNickname,
    handleSubmit: handleSubmitNickname,
    formState: { errors: nicknameErrors, isValid: isNicknameValid },
  } = useForm<NicknameForm>({
    mode: "onChange",
    resolver: zodResolver(nicknameSchema),
  });

  const onSubmitEmail = (data: EmailForm) => {
    setEmailValue(data.email);
    setStep("password");
  };

  const onSubmitPassword = (data: PasswordForm) => {
    setPasswordValue(data.password);
    setStep("nickname");
  };

  const onSubmitNickname = async (data: NicknameForm) => {
    try {
      const res = await axios.post("http://localhost:8000/v1/auth/signup", {
        email: emailValue,
        password: passwordValue,
        name: data.nickname,
      });
      setAccessToken(res.data.accessToken);
      setRefreshToken(res.data.refreshToken);
      alert("회원가입 성공!");
      navigate("/");
    } catch (err) {
      alert("회원가입 실패. 다시 시도해주세요.");
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

        {/* 뒤로가기 + 타이틀 */}
        <div className="flex items-center mb-6">
          <button onClick={handleBack} className="text-white text-xl mr-4">
            &lt;
          </button>
          <h1 className="text-white text-lg font-semibold">회원가입</h1>
        </div>

        {/* 이메일 표시 (step 2, 3) */}
        {(step === "password" || step === "nickname") && (
          <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
            <AiOutlineMail size={16} />
            <span>{emailValue}</span>
          </div>
        )}

        {/* Step 1: 이메일 */}
        {step === "email" && (
          <form onSubmit={handleSubmitEmail(onSubmitEmail)}>
            <button
              type="button"
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
              {...registerEmail("email")}
              placeholder="이메일을 입력해주세요!"
              className={`w-full p-3 mb-1 rounded-md border bg-transparent placeholder-gray-500 focus:outline-none text-white transition-colors ${
                emailErrors.email
                  ? "border-pink-500 bg-pink-950"
                  : "border-gray-600 focus:border-pink-500"
              }`}
            />
            {emailErrors.email && (
              <p className="text-pink-500 text-sm mb-2">{emailErrors.email.message}</p>
            )}

            <button
              type="submit"
              disabled={!isEmailValid}
              className={`w-full py-3 rounded-md font-semibold transition mt-2 ${
                isEmailValid
                  ? "bg-pink-500 hover:bg-pink-600 text-white"
                  : "bg-gray-800 text-gray-500 cursor-not-allowed"
              }`}
            >
              다음
            </button>
          </form>
        )}

        {/* Step 2: 비밀번호 */}
        {step === "password" && (
          <form onSubmit={handleSubmitPassword(onSubmitPassword)}>
            <div className="relative mb-1">
              <input
                type={showPassword ? "text" : "password"}
                {...registerPassword("password")}
                placeholder="비밀번호를 입력해주세요!"
                className={`w-full p-3 pr-10 rounded-md border bg-transparent placeholder-gray-500 focus:outline-none text-white transition-colors ${
                  passwordErrors.password
                    ? "border-pink-500 bg-pink-950"
                    : "border-gray-600 focus:border-pink-500"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-3.5 text-gray-400"
              >
                {showPassword ? <HiOutlineEyeOff size={20} /> : <HiOutlineEye size={20} />}
              </button>
            </div>
            {passwordErrors.password && (
              <p className="text-pink-500 text-sm mb-2">{passwordErrors.password.message}</p>
            )}

            <div className="relative mb-1">
              <input
                type={showPasswordConfirm ? "text" : "password"}
                {...registerPassword("passwordConfirm")}
                placeholder="비밀번호를 다시 한 번 입력해주세요!"
                className={`w-full p-3 pr-10 rounded-md border bg-transparent placeholder-gray-500 focus:outline-none text-white transition-colors ${
                  passwordErrors.passwordConfirm
                    ? "border-pink-500 bg-pink-950"
                    : "border-gray-600 focus:border-pink-500"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPasswordConfirm((v) => !v)}
                className="absolute right-3 top-3.5 text-gray-400"
              >
                {showPasswordConfirm ? <HiOutlineEyeOff size={20} /> : <HiOutlineEye size={20} />}
              </button>
            </div>
            {passwordErrors.passwordConfirm && (
              <p className="text-pink-500 text-sm mb-2">{passwordErrors.passwordConfirm.message}</p>
            )}

            <button
              type="submit"
              disabled={!isPasswordValid}
              className={`w-full py-3 rounded-md font-semibold transition mt-2 ${
                isPasswordValid
                  ? "bg-pink-500 hover:bg-pink-600 text-white"
                  : "bg-gray-800 text-gray-500 cursor-not-allowed"
              }`}
            >
              다음
            </button>
          </form>
        )}

        {/* Step 3: 닉네임 */}
        {step === "nickname" && (
          <form onSubmit={handleSubmitNickname(onSubmitNickname)}>
            <div className="flex justify-center mb-6">
              <div className="w-32 h-32 rounded-full bg-gray-600 overflow-hidden flex items-center justify-center">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png"
                  alt="프로필"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <input
              {...registerNickname("nickname")}
              placeholder="닉네임을 입력해주세요."
              className={`w-full p-3 mb-1 rounded-md border bg-transparent placeholder-gray-500 focus:outline-none text-white transition-colors ${
                nicknameErrors.nickname
                  ? "border-pink-500 bg-pink-950"
                  : "border-gray-600 focus:border-pink-500"
              }`}
            />
            {nicknameErrors.nickname && (
              <p className="text-pink-500 text-sm mb-2">{nicknameErrors.nickname.message}</p>
            )}

            <button
              type="submit"
              disabled={!isNicknameValid}
              className={`w-full py-3 rounded-md font-semibold transition mt-2 ${
                isNicknameValid
                  ? "bg-pink-500 hover:bg-pink-600 text-white"
                  : "bg-gray-800 text-gray-500 cursor-not-allowed"
              }`}
            >
              회원가입 완료
            </button>
          </form>
        )}

      </div>
    </div>
  );
};

export default SignUp;