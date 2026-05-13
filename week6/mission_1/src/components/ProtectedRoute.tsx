import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { AuthRequiredModal } from "./AuthRequiredModal";

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(true);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-400">
        확인 중...
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <AuthRequiredModal
        open={open}
        onConfirm={() => {
          setOpen(false);
          navigate("/login", {
            replace: true,
            state: { from: location.pathname + location.search },
          });
        }}
        onCancel={() => {
          setOpen(false);
          navigate("/", { replace: true });
        }}
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
