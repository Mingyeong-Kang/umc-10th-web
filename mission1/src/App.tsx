import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/root-layout";
import HomePage from "./pages/home";
import MoviesPage from "./pages/movies";
import NotFound from "./pages/not-found";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <HomePage /> },
      //너가 아래처럼 설정함으로써 /movies/popular , /movies/now-playing 등
      //모두 MoviesPage 컴포넌트로 감.
      { path: "movies/:category", element: <MoviesPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;