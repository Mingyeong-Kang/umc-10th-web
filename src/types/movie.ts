export interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  release_date: string;
  original_language: string;
  adult: boolean;
  genre_ids: number[];
  popularity: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieDetail extends Omit<Movie, "genre_ids"> {
  runtime: number;
  genres: Genre[];
  tagline: string;
  status: string;
  budget: number;
  revenue: number;
  homepage: string;
  imdb_id: string;
}

export interface SearchParams {
  query: string;
  include_adult: boolean;
  language: string;
}

export type SortOrder = "relevance" | "rating";
