import './App.css'
import HomePage from './pages/HomePage';
import MoviePage from './pages/MoviePage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
import MovieDetailPage from './pages/MovieDetailPage';

// BrowserRouter V5
// createBrowserRouter V6
// react-router-dom V7(next.js, remix)

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage></HomePage>,
    errorElement: <NotFoundPage></NotFoundPage>,
    children: [
      {
        path: 'movies/:category',
        element: <MoviePage></MoviePage>
      },
      {
        path: 'movie/:movieId',
        element: <MovieDetailPage></MovieDetailPage>
      }
    ]
  },

]);

//moives/upcoming
//movies/popular
//movies/now_playing
//movies/top_rated
//movies?category=upcoming
//movies?category=popular
//movies/123
//movies/category/{movie_id}

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App
