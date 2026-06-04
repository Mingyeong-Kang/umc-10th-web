import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import { postSignup } from "../apis/auth";
import { useState } from "react";
import { Navigate } from "react-router-dom";

const schema = z
  .object({
    email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
    password: z
      .string()
      .min(8, {
        message: "비밀번호는 8자 이상이어야 합니다.",
      })
      .max(20, {
        message: "비밀번호는 20자 이하여야 합니다.",
      }),
    passwordCheck: z
      .string()
      .min(8, {
        message: "비밀번호는 8자 이상이어야 합니다.",
      })
      .max(20, {
        message: "비밀번호는 20자 이하여야 합니다.",
      }),
    name: z.string().min(1, { message: "이름을 입력해주세요." }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
  });

type FormFields = z.infer<typeof schema>;

export const SignupPage = () => {
  //1. 단계별로 관리해서 다단계 폼 구현
  const [step, setStep] = useState(1); //1: 이메일 2: 비밀번호 3: 닉네임

  //2. 비밀번호 가시성 토글
  const [showPw, setShowPassword] = useState(false);
  const [showPwCheck, setShowPasswordCheck] = useState(false);

  //3. 회원가입 완료 상태
  const [isCompleted, setisCompleted] = useState(false);

  const {
    register,
    handleSubmit,
    trigger, //특정 필드 유효성 검사를 수동으로 실행할 때 사용
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  //다음 단계 이동 함수
  const nextStep = async (fields: (keyof FormFields)[]) => {
    const isStepValid = await trigger(fields);
    if (isStepValid) setStep((prev) => prev + 1)
  }

  //최종 제출 함수
  const onSubmit: SubmitHandler<FormFields> = async(data) => {
    console.log(data);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {passwordCheck, ...rest} = data;

    const response = await postSignup(rest);

    if(response) {
      setisCompleted(true); //회원가입 완료시 상태 변경
    }

    console.log(response);
  };

  // 성공했다면 홈으로 리다이렉트
  if (isCompleted) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="flex flex-col gap-3">

        {/* 뒤로가기 버튼 및 헤더 */}
        <div className="relative flex items-center justify-center w-full py-2">
          {step > 1 && (
            <button
              className="absolute left-0 cursor-pointer text-xl p-2"
              type="button" 
              onClick={() => setStep((prev) => prev - 1)}>
              {"<"}
            </button>
          )}
          <h2 className="text-center text-xl font-bold">회원가입</h2>
        </div>

        {/* step1: 이메일 입력 */}
        {step === 1 && (
          <>
            <input
              {...register("email")}
              className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
                ${errors?.email ? "border-red-500 bg-red-200" : "border-gray-300"}`}
              type={"email"}
              placeholder={"이메일을 입력해주세요!"}
              onBlur={() => trigger("email")}
            ></input>
            {errors.email && (
              <div className="text-red-500 text-sm">
                {errors.email.message}
              </div>
            )}
            <button
              className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300"
              type="button"
              onClick={() => nextStep(["email"])}
              disabled={!!errors.email || !getValues("email")}
            >
              다음
            </button>
          </>
        )}

        {/* step2: 비밀번호 입력 */}
        {step === 2 && (
          <>
            <div className="text-center mb-2">
              <p className="text-gray-400 text-sm">✉️ {getValues("email")}</p>
            </div>

            {/* 비밀번호 입력 */}
            <div className="relative">
              <input
                {...register("password")}
                className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
                  ${errors?.password ? "border-red-500 bg-red-200" : "border-gray-300"}`}
                type={showPw ? "text" : "password"}
                placeholder={"비밀번호를 입력해주세요!"}
                onBlur={() => trigger("password")}
              ></input>
              {/* 비번 가시성 토글 */}
              <button
                className="absolute right-3 top-3"
                type="button"
                onClick={() => setShowPassword(!showPw)}
              >
                {showPw ? "👁️" : "🙈"}
              </button>
            </div>

            {errors.password && (
              <div className="text-red-500 text-sm">
                {errors.password.message}
              </div>
            )}

            {/* 비밀번호 확인 */}
            <div className="relative">
              <input
              {...register("passwordCheck")}
              className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
                ${errors?.passwordCheck ? "border-red-500 bg-red-200" : "border-gray-300"}`}
              type={showPwCheck ? "text" : "password"}
              placeholder={"비밀번호를 다시 한번 입력해주세요!"}
              onBlur={() => trigger("passwordCheck")}
              ></input>
              {/* 비번 가시성 토글 */}
              <button
                className="absolute right-3 top-3"
                type="button"
                onClick={() => setShowPasswordCheck(!showPwCheck)}
              >
                {showPwCheck ? "👁️" : "🙈"}
              </button>
            </div>

            {errors.passwordCheck && (
              <div className="text-red-500 text-sm">
                {errors.passwordCheck.message}
              </div>
            )}

            <button
              className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300"
              type="button"
              onClick={() => nextStep(["password", "passwordCheck"])}
              disabled={!!errors.password || !!errors.passwordCheck || !getValues("passwordCheck")}
            >
              다음
            </button>
          </>
        )}
        {/* step3: 닉네임(이름) 입력 */}
        {step === 3 && (
          <div className="flex flex-col items-center gap-6">
              {/* 프로필 이미지 UI (더미) */}
              <div className="relative group">
                {/* 원형 배경 */}
                <div className="w-24 h-24 bg-gray-100 rounded-full border border-gray-200 flex items-center justify-center overflow-hidden">
                  {/* 기본 프로필 아이콘 (이미지 대신) */}
                  <span className="text-4xl text-gray-400">👤</span>
                </div>
              </div>

              {/* 닉네임 입력 섹션 */}
              <div className="flex flex-col gap-2">
                <input
                  {...register("name")}
                  className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm outline-none
                    ${errors?.name ? "border-red-500 bg-red-200" : "border-gray-300"}`}
                  type={"text"}
                  placeholder={"닉네임을 입력해주세요"}
                  onBlur={() => trigger("name")}
                />
                {errors.name && (
                  <div className="text-red-500 text-sm">
                    {errors.name.message}
                  </div>
                )}
              </div>

              <button
                className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300"
                type="button"
                onClick={handleSubmit(onSubmit)}
                disabled={!!errors.name || isSubmitting || !getValues("name")}
              >
                회원가입 완료
              </button>
            </div>
        )}
      </div>
    </div>
  );
};
