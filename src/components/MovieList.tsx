import { memo } from "react";
import type { Movie } from "../types/movie";
import MovieCard from "./MovieCard";

interface DisplayMovie extends Movie {
  formattedRating: string;
  formattedDate: string;
}

interface Props {
  movies: DisplayMovie[];
  onCardClick: (movie: Movie) => void;
}

// React.memo: selectedMovie(모달 상태)가 바뀌어도 movies/onCardClick이 동일하면 재렌더 없음
const MovieList = memo(function MovieList({ movies, onCardClick }: Props) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          formattedRating={movie.formattedRating}
          formattedDate={movie.formattedDate}
          onCardClick={onCardClick}
        />
      ))}
    </div>
  );
});

export default MovieList;
