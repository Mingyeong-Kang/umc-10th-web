import { useParams } from "react-router-dom";
import type { Movie, CreditsResponse } from "../types/movie";
import useCustomFetch from "../hooks/useCustomFetch";
import { LoadingSpinner } from "../components/LoadingSpinner";

export default function MovieDetailPage() {
  const { movieId } = useParams();

  const {
    data: movie,
    isLoading: isMovieLoading,
    isError: isMovieError,
  } = useCustomFetch<Movie>(`/movie/${movieId}`);

  const { data: credits, isLoading: isCreditsLoading } =
    useCustomFetch<CreditsResponse>(`/movie/${movieId}/credits`);

  if (isMovieLoading || isCreditsLoading)
    return (
      <div className="flex justify-center items-center h-screen bg-slate-950">
        <LoadingSpinner />
      </div>
    );

  if (isMovieError || !movie)
    return (
      <div className="text-center mt-10 text-white">
        ❌ 영화 정보를 찾을 수 없거나 에러가 발생했습니다.
      </div>
    );

  const cast = credits?.cast.slice(0, 10) || [];

  return (
    <div className="flex flex-col items-center bg-slate-950 text-white min-h-screen">
      <div className="flex flex-col md:flex-row p-10 gap-10 max-w-7xl w-full">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full md:w-1/3 rounded-lg shadow-lg"
        />
        <div className="flex flex-col gap-6 w-full md:w-2/3 mt-6 md:mt-0">
          <h1 className="text-4xl md:text-5xl font-bold">{movie.title}</h1>
          <div className="flex gap-4 items-center">
            <span className="text-xl">
              평균 {movie.vote_average?.toFixed(1)}
            </span>
            <span className="text-xl">{movie.release_date?.slice(0, 4)}</span>
            <span className="text-xl">{movie.runtime}분</span>
          </div>
          <p className="text-lg text-slate-300 leading-relaxed">
            {movie.overview}
          </p>
        </div>
      </div>

      <div className="w-full max-w-7xl px-10 pb-20 mt-16">
        <h2 className="text-3xl font-bold mb-10">감독/출연</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8">
          {cast.map((member) => (
            <div
              key={member.id}
              className="flex flex-col items-center text-center gap-4"
            >
              {member.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w185${member.profile_path}`}
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover shadow-md"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-slate-700 flex items-center justify-center text-slate-400">
                  {member.name[0]}
                </div>
              )}
              <div className="flex flex-col">
                <span className="font-semibold">{member.name}</span>
                <span className="text-sm text-slate-400">
                  {member.character}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
