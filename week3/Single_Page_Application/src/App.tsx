import { Router } from "./router/Router";
import { HomePage } from "./pages/HomePage";
import { MoviesPage } from "./pages/MoviesPage";
import { MyPage } from "./pages/MyPage";
import { NotFoundPage } from "./pages/NotFoundPage";

const routes = [
  { path: "/", element: <HomePage /> },
  { path: "/movies", element: <MoviesPage /> },
  { path: "/my", element: <MyPage /> },
];

function App() {
  return <Router routes={routes} notFound={<NotFoundPage />} />;
}

export default App; 

// 주석
