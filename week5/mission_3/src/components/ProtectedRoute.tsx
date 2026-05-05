import { Navigate, Outlet } from "react-router-dom";
import { getAccessToken } from "../utils/authStorage";

const ProtectedRoute = () => {
  const token = getAccessToken();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
