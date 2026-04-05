import { useState } from "react";


const LoginPage = () => {
  const handleSubmit = () => {
  }




  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="flex flex-col gap-3">
        {/* className 내의 불필요한 중괄호 {}와 따옴표 중첩 제거, type 속성 따옴표 정리 */}
        <input 
          className="border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm" 
          type={"email"}
          placeholder="이메일을 입력해주세요"
        />
        <input 
          className="border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm" 
          type={"password"}
          placeholder="비밀번호를 입력해주세요"
        />
        <button type='button' onClick={handleSubmit} disabled={false}
        className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font:medium hover:bg-blue-700 transition-colors cusor-pointer disabled:bg-gray-300">로그인</button>
      </div>
    </div>
  );
} 

export default LoginPage;