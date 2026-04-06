import HomePage from "./pages/Homepage";
import MoviePage from "./pages/Moviepage";
import NotFoundPage from "./pages/NotFoundpage";
import MovieDetailPage from "./pages/MovieDetailPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "movies/:category",
        element: <MoviePage />,
      },
      {
        path: "movie/:movieId",
        element: <MovieDetailPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
