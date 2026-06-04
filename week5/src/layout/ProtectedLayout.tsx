import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProtectedLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [showModal, setShowModal] = useState(false);

  // localStorage에서 직접 확인
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!accessToken) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [accessToken]);

  if (showModal) {
    return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
        <div className="bg-gray-800 rounded-xl p-8 flex flex-col items-center gap-4">
          <p className="text-white text-lg font-semibold">
            로그인이 필요한 페이지입니다.
          </p>

          <button
            className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
            onClick={() =>
              navigate("/login", {
                state: { from: location },
                replace: true,
              })
            }
          >
            확인
          </button>
        </div>
      </div>
    );
  }

  return <Outlet />;
}