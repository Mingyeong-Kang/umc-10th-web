import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/root-layout";
import HomePage from "./pages/home";
import MoviesPage from "./pages/movies";
import MovieDetailPage from "./pages/moviedetail"; 
import NotFound from "./pages/not-found";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "movies/:category", element: <MoviesPage /> },
      { path: "movie/:movieId", element: <MovieDetailPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;