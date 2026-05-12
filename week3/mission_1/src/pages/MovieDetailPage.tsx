import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import type { MovieDetails, Credits, Cast, Crew } from "../types/movie";
import { LoadingSpinner } from "../components/LoadingSpinner";

export default function MovieDetailPage() {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [credits, setCredits] = useState<Credits | null>(null);
  const [isPending, setIsPending] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      setIsPending(true);
      setIsError(false);
      try {
        const headers = {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
        };
        const [movieRes, creditsRes] = await Promise.all([
          axios.get<MovieDetails>(
            `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
            { headers }
          ),
          axios.get<Credits>(
            `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
            { headers }
          ),
        ]);
        setMovie(movieRes.data);
        setCredits(creditsRes.data);
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    fetchDetail();
  }, [movieId]);

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-dvh">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError || !movie) {
    return (
      <div className="flex items-center justify-center h-dvh">
        <span className="text-red-500 text-2xl">
          영화 정보를 불러오는 데 실패했습니다.
        </span>
      </div>
    );
  }

  const director: Crew | undefined = credits?.crew.find(
    (c) => c.job === "Director"
  );
  const topCast: Cast[] = credits?.cast.slice(0, 20) ?? [];

  return (
    <div className="min-h-dvh text-white">
      {/* 배경 백드롭 */}
      <div className="relative w-full h-[500px] overflow-hidden">
        {movie.backdrop_path && (
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

        {/* 영화 기본 정보 오버레이 */}
        <div className="absolute bottom-0 left-0 right-0 p-8 flex gap-8 items-end max-w-6xl mx-auto">
          {/* 포스터 */}
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                : "https://via.placeholder.com/300x450?text=No+Image"
            }
            alt={movie.title}
            className="w-48 rounded-xl shadow-2xl border-2 border-white/20 flex-shrink-0 hidden sm:block"
          />

          {/* 텍스트 정보 */}
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
              {movie.title}
            </h1>
            {movie.tagline && (
              <p className="text-gray-300 italic text-lg">"{movie.tagline}"</p>
            )}
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-300">
              <span className="bg-yellow-500 text-black font-bold px-2 py-0.5 rounded">
                ★ {movie.vote_average.toFixed(1)}
              </span>
              <span>{movie.release_date}</span>
              {movie.runtime > 0 && <span>{movie.runtime}분</span>}
              {director && <span>감독: {director.name}</span>}
            </div>
            <div className="flex flex-wrap gap-2 mt-1">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-[#b2dab1]/30 text-[#b2dab1] text-xs font-semibold px-3 py-1 rounded-full border border-[#b2dab1]/50"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 줄거리 */}
      <div className="max-w-6xl mx-auto px-8 py-10">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-[#b2dab1]">줄거리</h2>
          <p className="text-gray-300 leading-relaxed text-lg">
            {movie.overview || "줄거리 정보가 없습니다."}
          </p>
        </section>

        {/* 출연진 */}
        {topCast.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-6 text-[#b2dab1]">출연진</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-10 gap-4">
              {topCast.map((person) => (
                <div key={person.id} className="text-center">
                  <div className="w-full aspect-square rounded-full overflow-hidden bg-gray-800 mb-2">
                    <img
                      src={
                        person.profile_path
                          ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                          : "https://via.placeholder.com/185x185?text=No+Image"
                      }
                      alt={person.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-xs font-semibold truncate">{person.name}</p>
                  <p className="text-xs text-gray-400 truncate">
                    {person.character}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 제작 정보 */}
        <section className="mt-12 mb-16">
          <h2 className="text-2xl font-bold mb-4 text-[#b2dab1]">제작 정보</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
            <div className="bg-white/5 rounded-xl p-4">
              <p className="text-gray-400">상태</p>
              <p className="font-semibold mt-1">{movie.status}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <p className="text-gray-400">원제</p>
              <p className="font-semibold mt-1">{movie.original_title}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <p className="text-gray-400">예산</p>
              <p className="font-semibold mt-1">
                {movie.budget > 0
                  ? `$${movie.budget.toLocaleString()}`
                  : "정보 없음"}
              </p>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <p className="text-gray-400">수익</p>
              <p className="font-semibold mt-1">
                {movie.revenue > 0
                  ? `$${movie.revenue.toLocaleString()}`
                  : "정보 없음"}
              </p>
            </div>
          </div>

          {/* 제작사 */}
          {movie.production_companies.length > 0 && (
            <div className="mt-6">
              <p className="text-gray-400 text-sm mb-3">제작사</p>
              <div className="flex flex-wrap gap-4">
                {movie.production_companies.map((company) => (
                  <div
                    key={company.id}
                    className="bg-white/10 rounded-lg px-4 py-2 text-sm flex items-center gap-2"
                  >
                    {company.logo_path && (
                      <img
                        src={`https://image.tmdb.org/t/p/w92${company.logo_path}`}
                        alt={company.name}
                        className="h-6 object-contain invert"
                      />
                    )}
                    <span>{company.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
