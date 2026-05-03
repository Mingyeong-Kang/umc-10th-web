import { useParams } from "react-router-dom";
import type { MovieDetail, Credits } from "../types/movie-detail";
import useCustomFetch from "../hooks/useCustomFetch";

const MovieDetailPage = () => {
  const { movieId } = useParams();

  const movieUrl = `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR&api_key=919672ed7e6f18195fe693458000a460`;

  const creditUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=919672ed7e6f18195fe693458000a460`;

  const {
    data: movie,
    isLoading: movieLoading,
    error: movieError,
  } = useCustomFetch<MovieDetail>(movieUrl, [movieId]);

  const {
    data: credits,
    isLoading: creditLoading,
    error: creditError,
  } = useCustomFetch<Credits>(creditUrl, [movieId]);

  const isLoading = movieLoading || creditLoading;
  const error = movieError || creditError;

  if (isLoading) {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-10 h-10 border-4 border-gray-300 border-t-white rounded-full animate-spin"></div>
    </div>
  );
}
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!movie) return null;

  const director = credits?.crew.find(
    (person: any) => person.job === "Director"
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white p-6">
      <div className="flex flex-col md:flex-row gap-6">
        
        {/* 포스터 */}
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full md:w-1/3 rounded-xl shadow-lg"
        />

        {/* 정보 */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>

          <p className="text-yellow-400 mb-2">
            ⭐ {movie.vote_average.toFixed(1)}
          </p>

          <p className="text-gray-300 leading-relaxed">
            {movie.overview || "줄거리 정보 없음"}
          </p>

          <p className="mt-4 text-sm text-gray-400">
            감독: {director?.name || "정보 없음"}
          </p>
        </div>
      </div>

      {/* 출연진 */}
      <h2 className="mt-10 text-xl font-bold">출연진</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {credits?.cast.slice(0, 8).map((actor: any) => (
          <div key={actor.id} className="text-center">
            <p className="font-semibold">{actor.name}</p>
            <p className="text-sm text-gray-400">
              {actor.character}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieDetailPage;