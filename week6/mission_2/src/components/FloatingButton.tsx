import { useNavigate } from "react-router-dom";

export const FloatingButton = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate("/lp/new")}
      aria-label="LP 작성"
      className="fixed bottom-6 right-6 z-30 size-14 rounded-full bg-pink-500 hover:bg-pink-600 text-white text-3xl font-light shadow-lg flex items-center justify-center"
    >
      +
    </button>
  );
};
