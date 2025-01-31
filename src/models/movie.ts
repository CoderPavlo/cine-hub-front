export interface Genre {
    id: number,
    name: string,
}

export interface Movie {
    id: number,
    original_language: string,
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
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

export interface GetRequest<T> {
    page: number,
    results: T[],
    total_pages: number,
    total_results: number,
}