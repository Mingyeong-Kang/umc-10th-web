import type { Movie, MovieDetail, SearchParams } from "../types/movie";

const BASE_URL =
  import.meta.env.VITE_TMDB_BASE_URL ?? "https://api.themoviedb.org/3";
const API_KEY =
  import.meta.env.VITE_TMDB_API_KEY ?? import.meta.env.VITE_API_KEY ?? "";

async function tmdbFetch<T>(path: string, params: Record<string, string> = {}): Promise<T> {
  const url = new URL(`${BASE_URL}${path}`);
  url.searchParams.set("api_key", API_KEY);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error(`TMDB API 오류: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export async function searchMovies(params: SearchParams): Promise<Movie[]> {
  const data = await tmdbFetch<{ results: Movie[] }>("/search/movie", {
    query: params.query,
    include_adult: String(params.include_adult),
    language: params.language,
    page: "1",
  });
  return data.results;
}

export async function getMovieDetail(movieId: number, language = "ko-KR"): Promise<MovieDetail> {
  return tmdbFetch<MovieDetail>(`/movie/${movieId}`, { language });
}

export const POSTER_URL = (path: string) =>
  `https://image.tmdb.org/t/p/w500${path}`;

export const BACKDROP_URL = (path: string) =>
  `https://image.tmdb.org/t/p/original${path}`;
