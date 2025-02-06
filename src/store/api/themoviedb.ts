import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Genre, GetRequest, GetTrailerRequest, Movie } from '../../models/movie';
import { API_BASE_URL, API_KEY } from '../../helpers/apiConfig';

export const themoviedbAPI = createApi({
    reducerPath: 'themoviedbAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE_URL,
    }),
    endpoints: (build) => ({
        fetchGenres: build.query<{genres: Genre[]}, void>({
            query: () => ({
                url: `genre/movie/list?api_key=${API_KEY}&language=en-US`,
                method: 'GET',
            }),
        }),
        fetchPopularMovies: build.query<GetRequest<Movie>, number>({
            query: (page) => ({
                url: `movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`,
                method: 'GET',
            }),
        }),
        fetchNewMovies: build.query<GetRequest<Movie>, number>({
            query: (page) => ({
                url: `discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&language=en-US&page=${page}`,
                method: 'GET',
            }),
        }),
        fetchTrailer: build.query<GetTrailerRequest, number | undefined>({
            query: (id) => ({
                url: `movie/${id}/videos?language=en-US&api_key=${API_KEY}`,
                method: 'GET',
            }),
        }),
    }),
});