import { useCallback, useMemo, useState } from "react";
import MovieDetailModal from "../components/MovieDetailModal";
import MovieList from "../components/MovieList";
import SearchForm from "../components/SearchForm";
import { useMovieSearch } from "../hooks/useMovieSearch";
import type { Movie, SearchParams, SortOrder } from "../types/movie";

export default function MoviesPage() {
  const { movies, loading, error, hasSearched, search } = useMovieSearch();
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("relevance");

  // useCallback: 안정적인 참조를 SearchForm에 전달 → SearchForm 불필요 재렌더 방지
  const handleSearch = useCallback(
    (params: SearchParams) => {
      search(params);
    },
    [search]
  );

  // useCallback: MovieCard에 전달되는 클릭 핸들러 안정화
  // selectedMovie 변경 시에도 이 참조는 바뀌지 않음
  const handleCardClick = useCallback((movie: Movie) => {
    setSelectedMovie(movie);
  }, []);

  // useCallback: 모달 닫기 핸들러 안정화
  const handleModalClose = useCallback(() => {
    setSelectedMovie(null);
  }, []);

  const handleSortChange = useCallback((order: SortOrder) => {
    setSortOrder(order);
  }, []);

  // useMemo: movies 배열이 바뀔 때만 정렬·포맷 재계산
  // → sortOrder 변경이나 modal 열기로는 재계산되지 않음
  const displayedMovies = useMemo(() => {
    const sorted =
      sortOrder === "rating"
        ? [...movies].sort((a, b) => b.vote_average - a.vote_average)
        : movies;

    return sorted.map((movie) => ({
      ...movie,
      formattedRating: movie.vote_average.toFixed(1),
      formattedDate: movie.release_date
        ? new Date(movie.release_date).toLocaleDateString("ko-KR")
        : "미정",
    }));
  }, [movies, sortOrder]);

  return (
    <div className="p-4 md:p-6">
      {/* 검색 폼 */}
      <SearchForm onSearch={handleSearch} loading={loading} />

      {/* 검색 결과 헤더 */}
      {hasSearched && !loading && !error && (
        <div className="mt-5 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            {displayedMovies.length > 0
              ? `검색 결과 ${displayedMovies.length}편`
              : ""}
          </p>

          {displayedMovies.length > 1 && (
            <div className="flex gap-2">
              <button
                onClick={() => handleSortChange("relevance")}
                className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                  sortOrder === "relevance"
                    ? "bg-pink-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                관련순
              </button>
              <button
                onClick={() => handleSortChange("rating")}
                className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                  sortOrder === "rating"
                    ? "bg-pink-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                평점순
              </button>
            </div>
          )}
        </div>
      )}

      {/* 상태별 렌더링 */}
      <div className="mt-4">
        {loading && (
          <div className="flex flex-col items-center py-20">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-pink-500 border-t-transparent" />
            <p className="mt-4 text-sm text-gray-500">영화를 검색하는 중…</p>
          </div>
        )}

        {!loading && error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
            <p className="text-red-600">{error}</p>
            <p className="mt-1 text-sm text-red-400">
              API 키를 확인하거나 잠시 후 다시 시도해주세요.
            </p>
          </div>
        )}

        {!loading && !error && hasSearched && displayedMovies.length === 0 && (
          <div className="flex flex-col items-center py-20 text-center">
            <span className="text-5xl">🔍</span>
            <p className="mt-4 text-lg font-semibold text-gray-700">
              검색 결과가 없습니다.
            </p>
            <p className="mt-1 text-sm text-gray-400">다른 키워드로 검색해 보세요.</p>
          </div>
        )}

        {!loading && !error && !hasSearched && (
          <div className="flex flex-col items-center py-24 text-center">
            <span className="text-6xl">🎥</span>
            <p className="mt-4 text-xl font-semibold text-gray-700">
              영화를 검색해보세요
            </p>
            <p className="mt-2 text-sm text-gray-400">
              제목을 입력하고 언어·성인 여부를 설정한 뒤 검색 버튼을 눌러주세요.
            </p>
          </div>
        )}

        {!loading && !error && displayedMovies.length > 0 && (
          <MovieList movies={displayedMovies} onCardClick={handleCardClick} />
        )}
      </div>

      {/* 상세 모달 */}
      {selectedMovie && (
        <MovieDetailModal movie={selectedMovie} onClose={handleModalClose} />
      )}
    </div>
  );
}
