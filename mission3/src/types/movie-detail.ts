export interface MovieDetail {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
}

export interface Cast {
  id: number;
  name: string;
  character: string;
}

export interface Crew {
  id: number;
  name: string;
  job: string;
}

export interface Credits {
  cast: Cast[];
  crew: Crew[];
}