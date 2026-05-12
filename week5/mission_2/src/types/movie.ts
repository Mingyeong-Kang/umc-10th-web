export type Movie={
 adult:boolean;
backdrop_path: string;
genre_ids: number[];
id: number;
original_language:string;
original_title:string;
overview: string;
popularity: number;
poster_path: string;
release_date: string;
title:string
video:boolean;
vote_average:number;
vote_count:number;
}

export type MovieResponse= {
  page:number;
  results:Movie[];
  totalPages: number;
  total_results: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface MovieDetails {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  runtime: number;
  vote_average: number;
  vote_count: number;
  genres: Genre[];
  tagline: string;
  status: string;
  budget: number;
  revenue: number;
  production_companies: ProductionCompany[];
  original_language: string;
  popularity: number;
  adult: boolean;
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface Crew {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

export interface Credits {
  id: number;
  cast: Cast[];
  crew: Crew[];
}
