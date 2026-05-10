import useCustomFetch from "../hooks/useCustomFetch";
import { Link } from "react-router-dom";

export default function Home() {
  const { data, loading, error } = useCustomFetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_API_KEY}`
  );

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="grid grid-cols-5 gap-4 p-4">
      {data?.results.map((movie: any) => (
        <Link key={movie.id} to={`/movie/${movie.id}`}>
          <img
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          />
        </Link>
      ))}
    </div>
  );
}