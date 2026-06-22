import { memo, useCallback } from "react";
import { POSTER_URL } from "../api/movie";
import type { Movie } from "../types/movie";

interface Props {
  movie: Movie;
  formattedRating: string;
  formattedDate: string;
  onCardClick: (movie: Movie) => void;
}

// React.memo: 다른 카드 클릭(modal 열림)으로 인한 부모 재렌더 시 이 카드는 재렌더되지 않음
const MovieCard = memo(function MovieCard({
  movie,
  formattedRating,
  formattedDate,
  onCardClick,
}: Props) {
  // useCallback: onCardClick 참조가 안정적이고 movie가 동일하면 이 핸들러도 안정적
  const handleClick = useCallback(() => {
    onCardClick(movie);
  }, [onCardClick, movie]);

  return (
    <div
      onClick={handleClick}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      {/* 포스터 */}
      <div className="relative h-56 overflow-hidden bg-gray-100">
        {movie.poster_path ? (
          <img
            src={POSTER_URL(movie.poster_path)}
            alt={movie.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-4xl">🎬</span>
          </div>
        )}
        {/* 평점 배지 */}
        <div className="absolute bottom-2 right-2 rounded-full bg-black/70 px-2 py-0.5 text-xs font-bold text-yellow-400">
          ★ {formattedRating}
        </div>
      </div>

      {/* 정보 */}
      <div className="flex flex-1 flex-col p-3">
        <p className="line-clamp-2 font-semibold text-gray-900 leading-snug">
          {movie.title}
        </p>
        <p className="mt-1 text-xs text-gray-400">{formattedDate}</p>
        {movie.overview && (
          <p className="mt-2 line-clamp-2 text-xs text-gray-500 leading-relaxed">
            {movie.overview}
          </p>
        )}
      </div>
    </div>
  );
});

export default MovieCard;
