import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Genre, GetRequest, Movie } from '../../models/movie';

export const themoviedbAPI = createApi({
    reducerPath: 'themoviedbAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.themoviedb.org/3/',
    }),
    endpoints: (build) => ({
        fetchGenres: build.query<Genre[], void>({
            query: () => ({
                url: `genre/movie/list?api_key=${import.meta.env.VITE_THEMOVIEDB_APIKEY}&language=en-US`,
                method: 'GET',
            }),
        }),
        fetchPopularMovies: build.query<GetRequest<Movie>, number>({
            query: (page) => ({
                url: `movie/popular?api_key=${import.meta.env.VITE_THEMOVIEDB_APIKEY}&language=en-US&page=${page}`,
                method: 'GET',
            }),
        }),
    }),
});