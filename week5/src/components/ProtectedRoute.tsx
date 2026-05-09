import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { accessToken } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  if (accessToken) return children;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
      <div className="bg-gray-900 rounded-2xl p-8 w-80 flex flex-col items-center gap-4 shadow-xl">
        <p className="text-white text-center text-base font-medium">
          로그인이 필요한 서비스입니다.{"\n"}로그인을 해주세요!
        </p>
        <button
          onClick={() =>
            navigate("/login", { state: { from: location }, replace: true })
          }
          className="w-full py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg font-semibold transition"
        >
          확인
        </button>
      </div>
    </div>
  );
}