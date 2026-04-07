import { useParams, useNavigate } from "react-router-dom";
import {useState} from "react";
import type {MovieResponse } from "../types/movie";
import useCustomFetch from "../hooks/useCustomFetch";

const categoryMap: Record<string, string> = {
  popular: "popular",
  upcoming: "upcoming",
  "now-playing": "now_playing",
  "top-rated": "top_rated",
};



const MoviesPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);

  const apiCategory = categoryMap[category ?? "popular"] ?? "popular";

  const url =  `https://api.themoviedb.org/3/movie/${apiCategory}?language=ko-KR&region=KR&page=${page}&api_key=919672ed7e6f18195fe693458000a460`;

  const {data, isLoading, error} = useCustomFetch<MovieResponse>(url, [category, page]);

  const movies = data?.results ?? [];

  return (
    <div className="p-4 bg-black min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-4 capitalize">{apiCategory}</h1>

      {/* 로딩 */}
      {isLoading && (
        <div className="flex justify-center py-10">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-white rounded-full animate-spin"></div>
        </div>
      )}

      {/* 에러 */}
      {error && <p className="text-red-500">{error}</p>}

      {/* 영화 목록 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => navigate(`/movie/${movie.id}`)}
            className="relative group cursor-pointer overflow-hidden rounded-lg"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110 group-hover:blur-sm"
            />

            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 text-white p-3 flex flex-col justify-end transition-all duration-300">
              <h2 className="font-bold text-sm md:text-base mb-1">
                {movie.title}
              </h2>
              <p className="text-xs md:text-sm line-clamp-3">
                {movie.overview}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="flex justify-center mt-6 gap-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 rounded bg-gray-300 text-black hover:bg-gray-400 disabled:opacity-50"
        >
          이전
        </button>

        <span className="px-3 py-1 rounded bg-gray-200 text-black">
          {page}
        </span>

        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="px-3 py-1 rounded bg-gray-300 text-black hover:bg-gray-400"
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default MoviesPage;