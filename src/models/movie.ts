export interface Movie {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface MovieDetail {
    adult: boolean;
    backdrop_path: string;
    genres: Genre[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    runtime: number;
}

export interface Genre {
    id: number,
    name: string,
}

export interface Trailer {
    iso_639_1: string;  
  iso_3166_1: string; 
  name: string;     
  key: string;        
  site: string;      
  size: number;     
  type: string;     
  official: boolean;
  published_at: string; 
  id: string;
}

export interface GetTrailerRequest {
    id: number,
    results: Trailer[],
}

export interface SearchRequest {
    query: string,
    include_adult?: boolean,
    primary_release_year?: string,
    page: number,
    region?: string | null,
    year?: string,
}

export interface Region {
    iso_3166_1: string,
    english_name: string,
}