import { useEffect, useState } from "react";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_API_KEY}&page=${page}`
        );

        const data = await res.json();

        setMovies(data.results);
        setError("");
      } catch (e) {
        setError("에러가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page]);

  if (loading)
    return <div className="text-center mt-10">로딩중...</div>;

  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="p-5">
      <h1 className="text-2xl mb-4 text-center">영화 목록</h1>

      <div className="grid grid-cols-5 gap-4">
        {movies.map((movie) => (
          <div key={movie.id} className="relative group">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="rounded"
            />

            {/* hover */}
            <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center text-white text-center p-2">
              <p className="font-bold">{movie.title}</p>
              <p className="text-sm mt-2 line-clamp-3">
                {movie.overview}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="flex gap-4 justify-center mt-5">
        <button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-300 rounded"
        >
          이전
        </button>

        <span>{page} 페이지</span>

        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="px-3 py-1 bg-purple-300 rounded"
        >
          다음
        </button>
      </div>
    </div>
  );
}