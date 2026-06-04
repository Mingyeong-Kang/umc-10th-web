import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export const ProtectedLayout = () => {
    const {accessToken} = useAuth();
    const location = useLocation();

    if (!accessToken) {
        return <Navigate to={"/login"} state={{location}} replace></Navigate>
    }

  return (
    <div className="h-dvh flex flex-col"> 
        <Navbar></Navbar>
        <main className="flex-1 mt-10">
            <Outlet></Outlet>
        </main>
        <Footer>푸터</Footer>
    </div>
  )
}
