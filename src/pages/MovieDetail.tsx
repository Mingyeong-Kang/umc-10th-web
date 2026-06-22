import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BACKDROP_URL, POSTER_URL, getMovieDetail } from "../api/movie";
import type { MovieDetail as MovieDetailType } from "../types/movie";

export default function MovieDetail() {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<MovieDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!movieId) return;
    setLoading(true);
    getMovieDetail(Number(movieId))
      .then(setMovie)
      .catch(() => setError("영화 정보를 불러오지 못했습니다."))
      .finally(() => setLoading(false));
  }, [movieId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-pink-500 border-t-transparent" />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">{error || "영화를 찾을 수 없습니다."}</p>
        <Link to="/movies" className="mt-4 inline-block text-sm text-pink-500 underline">
          영화 검색으로 돌아가기
        </Link>
      </div>
    );
  }

  const runtime = movie.runtime
    ? `${Math.floor(movie.runtime / 60)}시간 ${movie.runtime % 60}분`
    : "미정";

  return (
    <div className="pb-12">
      {/* 배경 배너 */}
      {movie.backdrop_path && (
        <div
          className="h-64 bg-cover bg-center md:h-80"
          style={{ backgroundImage: `url(${BACKDROP_URL(movie.backdrop_path)})` }}
        >
          <div className="h-full w-full bg-black/40" />
        </div>
      )}

      <div className="mx-auto max-w-4xl p-6">
        <div className="flex flex-col gap-6 md:flex-row">
          {/* 포스터 */}
          {movie.poster_path && (
            <img
              src={POSTER_URL(movie.poster_path)}
              alt={movie.title}
              className="-mt-20 hidden w-40 self-start rounded-xl shadow-lg md:block"
            />
          )}

          {/* 정보 */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">{movie.title}</h1>
            {movie.tagline && (
              <p className="mt-1 italic text-gray-500">{movie.tagline}</p>
            )}

            <div className="mt-4 flex flex-wrap gap-2">
              {movie.genres.map((g) => (
                <span
                  key={g.id}
                  className="rounded-full bg-pink-50 px-3 py-1 text-xs font-medium text-pink-600"
                >
                  {g.name}
                </span>
              ))}
            </div>

            <div className="mt-4 space-y-1.5 text-sm text-gray-600">
              <p>
                <span className="font-medium text-gray-800">평점</span>{" "}
                <span className="text-yellow-500">★ {movie.vote_average.toFixed(1)}</span>
              </p>
              <p>
                <span className="font-medium text-gray-800">개봉일</span>{" "}
                {movie.release_date
                  ? new Date(movie.release_date).toLocaleDateString("ko-KR")
                  : "미정"}
              </p>
              <p>
                <span className="font-medium text-gray-800">러닝타임</span> {runtime}
              </p>
              <p>
                <span className="font-medium text-gray-800">원제</span> {movie.original_title}
              </p>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-gray-700">{movie.overview}</p>

            <div className="mt-6 flex gap-3">
              <a
                href={`https://www.imdb.com/find?q=${encodeURIComponent(movie.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-yellow-400 px-4 py-2 text-sm font-bold text-black hover:bg-yellow-500"
              >
                IMDb에서 검색하기 ↗
              </a>
              <Link
                to="/movies"
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
              >
                목록으로
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
