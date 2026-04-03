import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import type { Movie } from "../types/movie";

export default function MovieDetailPage() {
  const { movieId } = useParams();

  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!movieId) return;

    const fetchMovie = async () => {
      try {
        setIsLoading(true);

        const { data } = await axios.get<Movie>(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${import.meta.env.VITE_TMDB_KEY}&language=ko-KR`,
        );

        setMovie(data);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  if (isLoading) return <div className="text-center mt-10">로딩중...</div>;
  if (!movie) return <div className="text-center mt-10">데이터 없음</div>;

  return (
    <div className="flex flex-col items-center text-center p-10">
      <h1 className="text-4xl font-bold mb-6">{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
        className="my-8"
      />
      <p className="max-w-xl text-gray-700 leading-relaxed">{movie.overview}</p>
    </div>
  );
}
