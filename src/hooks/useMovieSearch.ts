import { useCallback, useState } from "react";
import { searchMovies } from "../api/movie";
import type { Movie, SearchParams } from "../types/movie";

export function useMovieSearch() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // stable reference: setters from useState never change
  const search = useCallback(async (params: SearchParams) => {
    if (!params.query.trim()) return;
    setLoading(true);
    setError(null);
    setHasSearched(true);
    try {
      const results = await searchMovies(params);
      setMovies(results);
    } catch {
      setError("검색 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return { movies, loading, error, hasSearched, search };
}
