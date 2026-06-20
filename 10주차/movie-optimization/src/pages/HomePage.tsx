import { useMemo, useState } from "react";
import type { AxiosRequestConfig } from "axios";

import MovieFilter from "../components/Moviefilter";
import MovieList from "../components/MovieList";
import useFetch from "../hooks/useFetch";
import type { MovieFilters, MovieResponse } from "../types/movie";

const HomePage = () => {
  const [filters, setFilters] = useState<MovieFilters>({
    query: "어벤져스",
    include_adult: false,
    language: "ko-KR",
  });

  const axiosRequestConfig = useMemo<AxiosRequestConfig>(
    () => ({
      params: filters,
    }),
    [filters],
  );

  const { data, error, isLoading } = useFetch<MovieResponse>(
    "/search/movie",
    axiosRequestConfig,
  );

  const handleMovieFilters = (newFilters: MovieFilters): void => {
    setFilters(newFilters);
  };

  if (error) {
    return <div className="p-10 text-red-500">{error}</div>;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-8 text-center text-3xl font-bold">영화 검색</h1>

      <MovieFilter onChange={handleMovieFilters} />

      {isLoading ? (
        <div className="py-10 text-center text-gray-500">로딩 중 입니다...</div>
      ) : (
        <MovieList movies={data?.results || []} />
      )}
    </div>
  );
};

export default HomePage;
