import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/root-layout";
import HomePage from "./pages/home";
import MoviesPage from "./pages/movies";
import MovieDetailPage from "./pages/moviedetail";
import NotFound from "./pages/not-found";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import AuthProvider from "./context/AuthContext";
import MyPage from "./pages/MyPage";
import ProtectedLayout from "./layout/ProtectedLayout";
import GoogleCallback from "./pages/GoogleCallback";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "movies/:category", element: <MoviesPage /> },
      { path: "movie/:movieId", element: <MovieDetailPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "v1/auth/google/callback", element: <GoogleCallback /> },

      // 🔒 로그인이 필요한 페이지
      {
        element: <ProtectedLayout />,
        children: [
          { path: "my", element: <MyPage /> },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;