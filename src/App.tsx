import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import LPDetail from "./pages/LPDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyPage from "./pages/MyPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Sidebar />

      <main className="min-h-[calc(100vh-64px)] bg-gray-50 md:ml-64">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/lp/:lpId"
            element={
              <ProtectedRoute>
                <LPDetail />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/mypage"
            element={
              <ProtectedRoute>
                <MyPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;