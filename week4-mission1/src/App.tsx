import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/root-layout";
import HomePage from "./pages/home";
import MoviesPage from "./pages/movies";
import MovieDetailPage from "./pages/moviedetail"; 
import NotFound from "./pages/not-found";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";

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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;