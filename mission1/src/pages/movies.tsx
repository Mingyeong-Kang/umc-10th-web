// src/pages/movies.tsx
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import type { Movie, MovieResponse } from "../types/movie";
import axios from "axios";

const MoviesPage = () => {
  const params = useParams();
  console.log(params);

  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchMovies = async () => {
      try {
        const { data } = await axios.get<MovieResponse>(
          "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1&api_key=919672ed7e6f18195fe693458000a460",
          {
            headers: {
              Authorization: `Bearer 919672ed7e6f18195fe693458000a460`,
            },
            cancelToken: source.token,
          }
        );
        setMovies(data.results);
        console.log(data.results);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("요청 취소됨:", error.message);
        } else {
          console.error("API 호출 실패:", error);
        }
      }
    };

    fetchMovies();

    return () => {
      source.cancel("컴포넌트 언마운트로 요청 취소");
    };
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        {params.movieID ? `${params.movieID}번의 Movies Page` : "Movies Page"}
      </h1>

      {/* 그리드 레이아웃 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {movies?.map((movie) => (
          <div
            key={movie.id}
            className="relative group cursor-pointer overflow-hidden rounded-lg"
          >
            {/* 포스터 이미지 */}
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="
                w-full h-full object-cover
                transition-all duration-300
                filter
                group-hover:scale-110
              "
            />
            {/* 호버 시 표시되는 제목 & 줄거리 */}
            <div
              className="
                absolute inset-0
                bg-black/60
                backdrop-blur-sm
                opacity-0 group-hover:opacity-100
                text-white p-3
                flex flex-col justify-end
                transition-all duration-300
              "
            >
              <h2 className="font-bold text-sm md:text-base mb-1">{movie.title}</h2>
              <p className="text-xs md:text-sm line-clamp-3">{movie.overview}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviesPage;